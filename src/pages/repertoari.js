import { useEffect, useMemo, useRef, useState } from "react";
import axiosClient from "../utils/axios";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Izvodjenje from "../components/predstave/Izvodjenje";
import Select from "react-select";
import RepertoariHeader from "../components/post/post-format/elements/meta/RepertoariHeader";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { Serbian } from "flatpickr/dist/l10n/sr.js";
import { useMediaQuery } from "react-responsive";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { toIntArray } from "../utils";
import { toast } from "react-hot-toast";

const RepertoariNewPage = () => {
    const [date, setDate] = useState([]);
    const [datumOd, setDatumOd] = useState(new Date());
    const [datumDo, setDatumDo] = useState(new Date());
    const [izvodjenja, setIzvodjenja] = useState([]);
    const [displayValue, setDisplayValue] = useState("");
    const [dbGradovi, setDbGradovi] = useState([]);
    const [dbZanrovi, setDbZanrovi] = useState([]);

    const [loading, setLoading] = useState(false);
    const [optionsLoading, setOptionsLoading] = useState(false);
    const [routerReadyFilters, setRouterReadyFilters] = useState(false);
    const [meta, setMeta] = useState(null);
    const [filters, setFilters] = useState({
        zanrovi: [],
        gradovi: [],
        datumi: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
        page: 1,
    });
    const selectedZanrovi = dbZanrovi.filter((z) =>
        filters.zanrovi.includes(z.value),
    );
    const fpInstance = useRef(null);
    const [active, setActive] = useState("today");
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const router = useRouter();

    const flatpickrOptions = useMemo(
        () => ({
            mode: "range",
            closeOnSelect: false,
            wrap: true,
            dateFormat: "Y-m-d",
            locale: { ...Serbian },
            position: isTabletOrMobile ? "auto center" : "auto left",
            static: true,
        }),
        [],
    );

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setOptionsLoading(true);
            try {
                const requests = [
                    axiosClient.get("/get-gradovi"),
                    axiosClient.get("/get-zanrovi"),
                ];

                const [gRes, zRes] = await Promise.all(requests);

                if (!isMounted) return;

                setDbZanrovi(
                    zRes.data.map((zanr) => ({
                        value: zanr.zanrid,
                        label: zanr.naziv_zanra,
                    })) || [],
                );
                setDbGradovi(
                    gRes.data.map((grad) => ({
                        value: grad.gradid,
                        label: grad.naziv_grada,
                    })) || [],
                );
            } catch (error) {
                console.error(error);
                toast.error(
                    "Greška prilikom učitavanja podataka. Pokušajte ponovo.",
                );
            } finally {
                if (isMounted) {
                    setOptionsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        const preset = router.query.datumi;

        if (preset === "today" || preset === "week" || preset === "month") {
            applyDatePreset(preset);
        }

        setFilters((prev) => ({
            ...prev,
            zanrovi: toIntArray(router.query.zanrovi),
            page: 1,
        }));
        setRouterReadyFilters(true);
    }, [router.isReady, router.query.zanrovi, router.query.datumi]);

    const lastFetchKeyRef = useRef("");
    useEffect(() => {
        if (!routerReadyFilters) return;
        console.log(filters);
        const ctrl = new AbortController();

        const params = {
            zanrovi: filters.zanrovi.length
                ? filters.zanrovi.join(",")
                : undefined,
            gradovi: filters.gradovi.length
                ? filters.gradovi.join(",")
                : undefined,
            datumi: filters.datumi ?? undefined,
            page: filters.page,
        };

        console.log("[DEFAULT+FILTERS]", filters);
        console.log("[API PARAMS]", params);

        const key = JSON.stringify(params);
        if (key === lastFetchKeyRef.current) return;
        lastFetchKeyRef.current = key;
        setLoading(true);
        (async () => {
            try {
                const res = await axiosClient.get("/get-repertoari-filtered", {
                    params,
                    signal: ctrl.signal,
                });
                console.log("FROM API: ");
                console.log(res);

                const incoming = res.data?.data || [];
                setIzvodjenja((prev) =>
                    filters.page > 1 ? [...prev, ...incoming] : incoming,
                );

                setMeta({
                    currentPage: res.data.current_page,
                    lastPage: res.data.last_page,
                    total: res.data.total,
                });
            } catch (e) {
                if (e.name !== "CanceledError" && e.name !== "AbortError")
                    console.error(e);
            } finally {
                setLoading(false);
            }
        })();

        return () => ctrl.abort();
    }, [filters]);

    const handleDateClick = (dates, str, instance) => {
        //setActive("custom");
        console.log(dates);
        setDatumOd(dates[0]);
        if (dates.length > 1) {
            setDatumDo(dates[1]);
            setFilters((prev) => ({
                ...prev,
                datumi: [
                    moment(dates[0]).format("YYYY-MM-DD"),
                    moment(dates[1]).format("YYYY-MM-DD"),
                ],
                page: 1,
            }));
        }
        setDate(dates);

        setDisplayValue(formatDisplay(dates));

        if (dates.length === 2 && fpInstance.current) {
            fpInstance.current.close();
        }
    };

    const onPresetClick = (key, fn) => () => {
        // make preset active and remove custom active
        setActiveBtn(key);

        // optional: close calendar if it's open
        fpInstance.current?.close();

        // run your existing filtering logic
        fn();
    };

    const getTodaysEvents = onPresetClick("today", () => {
        applyDatePreset("today");
    });

    const getWeekEvents = onPresetClick("week", () => {
        applyDatePreset("week");
    });

    const getMonthEvents = onPresetClick("month", () => {
        applyDatePreset("month");
    });

    const applyDatePreset = (preset) => {
        let dateArr = [];

        switch (preset) {
            case "today":
                dateArr = [
                    moment().startOf("day").toDate(),
                    moment().endOf("day").toDate(),
                ];
                break;

            case "week":
                dateArr = [
                    moment().startOf("day").toDate(),
                    moment().endOf("week").toDate(),
                ];
                break;

            case "month":
                dateArr = [
                    moment().startOf("day").toDate(),
                    moment().endOf("month").toDate(),
                ];
                break;

            default:
                return;
        }
        setActiveBtn(preset);
        setDate(dateArr);
        setDisplayValue(formatDisplay(dateArr));
        handleDateClick(dateArr);

        setFilters((prev) => ({
            ...prev,
            page: 1,
        }));
    };

    const formatDisplay = (dates) => {
        if (!dates || dates.length === 0) return "";

        if (dates.length === 1) {
            return moment(dates[0]).format("DD.MM.YYYY.");
        }

        return `${moment(dates[0]).format("DD.MM.YYYY.")} - ${moment(
            dates[1],
        ).format("DD.MM.YYYY.")}`;
    };

    const rootEl = () => document.getElementById("date-filter");

    const clearAllActive = () => {
        const root = rootEl();
        if (!root) return;
        root.querySelectorAll("[data-date-btn].active").forEach((el) => {
            el.classList.remove("active");
        });
    };

    const setActiveBtn = (key) => {
        const root = rootEl();
        if (!root) return;
        clearAllActive();
        root.querySelector(`[data-date-btn="${key}"]`)?.classList.add("active");
    };

    // Called when Flatpickr opens (Custom)
    const handleCustomOpen = (_, __, instance) => {
        // instance.element is the wrapper you passed to Flatpickr
        // safer to scope within that element:
        const btn = instance.element.querySelector('[data-date-btn="custom"]');
        if (!btn) return;

        // single selection: clear others then set custom
        clearAllActive();
        btn.classList.add("active");
    };

    const onChangeMulti = (key) => (items) => {
        const ids = (items || []).map((x) => x.value);
        setFilters((prev) => ({ ...prev, [key]: ids, page: 1 }));
    };

    const canLoadMore = useMemo(() => {
        if (!meta) return false;
        return meta.currentPage < meta.lastPage;
    }, [meta]);

    const loadMore = () => {
        if (!canLoadMore) return;
        setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    };

    return (
        <>
            <div className="p-t-md-60 p-t-xs-30">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="repertoar-filter-wrapper">
                            <h5>Filtriraj repertoare</h5>
                            <div className="repertoar-filter-gradovi-zanrovi-wrapper">
                                {optionsLoading && <Spinner />}
                                <Select
                                    instanceId="grd2"
                                    name="gradovi"
                                    placeholder="Izaberi gradove"
                                    options={dbGradovi}
                                    isMulti={true}
                                    onChange={onChangeMulti("gradovi")}
                                    key="grd2"
                                    isDisabled={loading}
                                    className="repertoari-filter-select"
                                />

                                <Select
                                    instanceId="zanrovi1"
                                    name="zanrovi"
                                    placeholder="Izaberi žanrove"
                                    options={dbZanrovi}
                                    value={selectedZanrovi}
                                    key="znr2"
                                    isMulti={true}
                                    onChange={onChangeMulti("zanrovi")}
                                    isDisabled={loading}
                                    className="repertoari-filter-select"
                                />
                            </div>
                            <div className="repertoar-filter-date-wrapper">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="btn-group" id="date-filter">
                                        <button
                                            onClick={getTodaysEvents}
                                            data-date-btn="today"
                                            className={`date-filter-btn ${active === "today" ? "active" : ""}`}
                                            key="btn-rep-today"
                                            disabled={loading}
                                        >
                                            Danas
                                        </button>

                                        <button
                                            onClick={getWeekEvents}
                                            data-date-btn="week"
                                            className={`date-filter-btn ${active === "week" ? "active" : ""}`}
                                            key="btn-rep-week"
                                            disabled={loading}
                                        >
                                            Ove nedelje
                                        </button>

                                        <button
                                            onClick={getMonthEvents}
                                            data-date-btn="month"
                                            className={`date-filter-btn ${active === "month" ? "active" : ""}`}
                                            key="btn-rep-month"
                                            disabled={loading}
                                        >
                                            Ovog meseca
                                        </button>

                                        <Flatpickr
                                            onChange={handleDateClick}
                                            options={flatpickrOptions}
                                            onReady={(_, __, instance) => {
                                                fpInstance.current = instance; // so we can close it from preset clicks if you want
                                            }}
                                            onOpen={handleCustomOpen}
                                        >
                                            <div className="d-inline-block">
                                                {/* This becomes the trigger */}
                                                <button
                                                    type="button"
                                                    key="btn-rep-custom"
                                                    disabled={loading}
                                                    data-toggle
                                                    data-date-btn="custom"
                                                    className={`date-filter-btn ${
                                                        active === "custom"
                                                            ? "active"
                                                            : ""
                                                    } date-filter-custom-btn`}
                                                >
                                                    Izaberi datume
                                                </button>

                                                {/* Required real input (hidden safely) */}
                                                <input
                                                    type="text"
                                                    data-input
                                                    style={{
                                                        display: "none",
                                                    }}
                                                    readOnly
                                                />
                                            </div>
                                        </Flatpickr>
                                    </div>
                                </div>
                                {/* <p>
                                    {datumOd &&
                                        moment(datumOd).format(
                                            "DD. MMM YYYY.",
                                        )}{" "}
                                    -{" "}
                                    {datumDo &&
                                        moment(datumDo).format("DD. MMM YYYY.")}
                                </p> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        {!loading && (
                            <p>
                                Prikazano {izvodjenja?.length} od {meta?.total}
                            </p>
                        )}
                        <div className="repertoari-wrapper axil-content">
                            {loading && (
                                <Spinner
                                    animation="border"
                                    role="status"
                                    className="hup-spinner"
                                />
                            )}
                            {izvodjenja.map((e) => {
                                return (
                                    <>
                                        <Izvodjenje
                                            izvodjenjeData={e}
                                            showPozoriste={true}
                                            showPredstava={true}
                                            key={`rep-${e.seigraid}`}
                                        />
                                    </>
                                );
                            })}
                        </div>

                        {canLoadMore && (
                            <button
                                className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                                onClick={loadMore}
                                disabled={loading}
                            >
                                {loading && filters.page > 1
                                    ? "Učitavanje…"
                                    : "Učitaj još"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RepertoariNewPage;

RepertoariNewPage.getLayoutProps = (pageProps) => ({
    header: <RepertoariHeader />,
    noSidebar: false,
});
