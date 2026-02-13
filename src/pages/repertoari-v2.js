import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../utils/axios";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Izvodjenje from "../components/predstave/Izvodjenje";
import Select from "react-select";
import PredstaveLayout from "../components/post/layout/PredstaveLayout";
import SectionTitle from "../components/elements/SectionTitle";
import RepertoariHeader from "../components/post/post-format/elements/meta/RepertoariHeader";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { Serbian } from "flatpickr/dist/l10n/sr.js";

const RepertoariNewPage = () => {
    const [date, setDate] = useState([new Date(), new Date()]);
    const [datumOd, setDatumOd] = useState(new Date());
    const [datumDo, setDatumDo] = useState(new Date());
    const [dbEvents, setDbEvents] = useState([]);
    const [displayEvents, setDisplayEvents] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);
    const [displayValue, setDisplayValue] = useState("");
    const [dbGradovi, setDbGradovi] = useState([]);
    const [selectedGradovi, setSelectedGradovi] = useState([]);
    const [loading, setLoading] = useState(false);
    const [predstave, setPredstave] = useState([]);
    const fpInstance = useRef(null);
    const [active, setActive] = useState("today");

    useEffect(() => {
        axiosClient
            .get(`/get-repertoari`)
            .then((res) => {
                console.log(res.data);
                setDbEvents(res.data);
                setDisplayEvents(res.data);
                setDate(new Date("2019-09-10"));
            })
            .catch((err) => {
                // setLoading(false);
                console.error(err.message);
            });
        axiosClient
            .get("/get-gradovi")
            .then((res) => {
                console.log(res.data);
                setDbGradovi(
                    res.data.map((grad) => ({
                        value: grad.gradid,
                        label: grad.naziv_grada,
                    })),
                );
            })
            .catch((error) => console.error(error));
        // axiosClient
        //     .get("/get-predstave-with-texts")
        //     .then((res) => {
        //         console.log(res.data);
        //         setPredstave(res.data);
        //     })
        //     .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        // filterEventsByDate(datumOd, datumDo);

        const mDatumOd = new moment(datumOd);
        const mDatumDo = new moment(datumDo);
        console.log("mDates in filter metod");
        let filteredEvents = dbEvents;
        console.log(mDatumOd);
        console.log(mDatumDo);
        if (datumDo) {
            filteredEvents = dbEvents.filter(
                (dbe) =>
                    new moment(dbe.datum).isSameOrAfter(mDatumOd) &&
                    new moment(dbe.datum).isBefore(mDatumDo),
            );
        } else {
            filteredEvents = dbEvents.filter((dbe) =>
                new moment(dbe.datum).isSame(mDatumOd),
            );
        }
        console.log("After filter");

        console.log(filteredEvents);

        if (selectedGradovi.length > 0) {
            console.log("Filter by grad");
            console.log(selectedGradovi);
            // filteredEvents = displayEvents;
            filteredEvents = filteredEvents.filter(
                (igranje) =>
                    selectedGradovi.includes(igranje.pozoriste.grad.gradid),
                //igranje.pozoriste.grad.gradid.includes(selectedGradovi)
                //predstava.pozorista.some(poz => selectedGradovi.includes(poz.grad.gradid))
            );
        }
        setDisplayEvents(filteredEvents);
    }, [datumOd, datumDo, selectedGradovi]);

    const handleDateClick = (dates, str, instance) => {
        //setActive("custom");
        setDatumOd(dates[0]);
        if (dates.length > 1) setDatumDo(dates[1]);
        setDate(dates);
        setDisplayValue(formatDisplay(dates));
    };

    const openCalendar = () => {
        setActive("custom");
        fpRef.current?.flatpickr?.open();
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
        // const today = new ("2019-09-14 00:00:00.000") // TO DO change to today

        // setActive("today");
        const todayA = new Date("2019-09-14 00:00:00.000");
        const todayB = new Date("2019-09-14 23:59:59.000");
        //setDate(todatA);
        const dateArr = [todayA, todayB];
        setDate(dateArr);
        setDisplayValue(formatDisplay(dateArr));

        //setDatumOd(todatA);
        handleDateClick(dateArr);
    });

    const getWeekEvents = onPresetClick("week", () => {
        // setActive("week");
        const weekA = new Date("2019-09-14 00:00:00.000"); // TO DO
        const weekB = new Date("2019-09-21 23:59:59.000");

        const dateArr = [weekA, weekB];
        setDate(dateArr);
        setDisplayValue(formatDisplay(dateArr));
        handleDateClick(dateArr);
    });

    const getMonthEvents = onPresetClick("month", () => {
        //setActive("month");
        const monthA = new Date("2019-09-14 00:00:00.000");
        const monthB = new Date(monthA.getFullYear(), monthA.getMonth() + 1, 0);

        const dateArr = [monthA, monthB];
        setDate(dateArr);
        setDisplayValue(formatDisplay(dateArr));
        handleDateClick(dateArr);
    });

    const formatDisplay = (dates) => {
        if (!dates || dates.length === 0) return "";

        if (dates.length === 1) {
            return moment(dates[0]).format("DD.MM.YYYY");
        }

        return `${moment(dates[0]).format("DD.MM.YYYY")} - ${moment(
            dates[1],
        ).format("DD.MM.YYYY")}`;
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

    const handleLoadMoreIzvodjenja = () => {
        setVisibleCount(visibleCount + 10);
    };

    const handleGradoviChange = useCallback((e) => {
        const sg = e.map((obj) => obj.value);
        setSelectedGradovi(sg);
    });

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="repertoar-filter-wrapper">
                            <h5>Filtriraj repertoare</h5>
                            <div className="repertoar-filter-gradovi-zanrovi-wrapper">
                                <Select
                                    instanceId="grd2"
                                    name="gradovi"
                                    placeholder="Izaberi gradove"
                                    options={dbGradovi}
                                    isMulti={true}
                                    onChange={(e) => handleGradoviChange(e)}
                                    key="grd2"
                                />

                                <Select
                                    instanceId="zanrovi1"
                                    name="zanrove"
                                    placeholder="Izaberi zanrove"
                                    key="znr2"
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
                                        >
                                            Danas
                                        </button>

                                        <button
                                            onClick={getWeekEvents}
                                            data-date-btn="week"
                                            className={`date-filter-btn ${active === "week" ? "active" : ""}`}
                                            key="btn-rep-week"
                                        >
                                            Ove nedelje
                                        </button>

                                        <button
                                            onClick={getMonthEvents}
                                            data-date-btn="month"
                                            className={`date-filter-btn ${active === "month" ? "active" : ""}`}
                                            key="btn-rep-month"
                                        >
                                            Ovog meseca
                                        </button>

                                        <Flatpickr
                                            value={date}
                                            onChange={handleDateClick}
                                            options={{
                                                mode: "range",
                                                closeOnSelect: false,
                                                wrap: true,
                                                dateFormat: "Y-m-d",
                                                locale: { ...Serbian },
                                                static: true,
                                                position: "below",
                                            }}
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
                                <p>
                                    {" "}
                                    {datumOd?.toDateString()} -{" "}
                                    {datumDo?.toDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <p>Ukupno: {displayEvents.length} izvodjenja</p>
                        <div className="repertoari-wrapper">
                            {displayEvents.slice(0, visibleCount).map((e) => {
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
                        {visibleCount < displayEvents?.length && (
                            <button
                                className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                                onClick={handleLoadMoreIzvodjenja}
                            >
                                Učitaj još
                            </button>
                        )}
                    </div>
                    <div className="col-lg-12">
                        {/* <SectionTitle title="Predstave o kojima smo pisali" />
                            {predstave.map((pred) => (
                                <PredstaveLayout
                                    data={pred}
                                    pClass=""
                                    showPozoriste={false}
                                    key={pred.predstavaid}
                                />
                            ))} */}
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
