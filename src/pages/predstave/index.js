import { useMemo, useEffect, useRef, useState } from "react";
import axiosClient from "../../utils/axios";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import PredstaveLayout from "../../components/post/layout/PredstaveLayout";
import Select from "react-select";

import PredstaveHeader from "../../components/post/post-format/elements/meta/PredstaveHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function PredstavePage() {
    const [predstave, setPredstave] = useState([]);
    const [dbGradovi, setDbGradovi] = useState([]);
    const [dbZanrovi, setDbZanrovi] = useState([]);
    const [loading, setLoading] = useState([]);

    const SORT_OPTIONS = [
        { value: "name_asc", label: "Naziv (A-Z)" },
        { value: "rating_desc", label: "Ocena (najviše)" },
        { value: "premijera", label: "Premijera (najnovije)" },
    ];
    const searchDebounceRef = useRef(null);
    const [meta, setMeta] = useState(null);
    const [filters, setFilters] = useState({
        search: "",
        zanrovi: [],
        gradovi: [],
        sort: "name_asc",
        page: 1,
        hasReviews: false,
    });
    const [searchInput, setSearchInput] = useState(filters.search);

    // initial fetching gradovi, and zanrovi
    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);

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
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    // Fetch predstave whenever filters change
    const lastFetchKeyRef = useRef("");
    useEffect(() => {
        const ctrl = new AbortController();

        const params = {
            search: filters.search ? filters.search : undefined,
            zanrovi: filters.zanrovi.length
                ? filters.zanrovi.join(",")
                : undefined,
            gradovi: filters.gradovi.length
                ? filters.gradovi.join(",")
                : undefined,
            sort: filters.sort,
            page: filters.page,
            hasReviews: filters.hasReviews ? 1 : undefined,
        };

        console.log("[DEFAULT+FILTERS]", filters);
        console.log("[API PARAMS]", params);

        const key = JSON.stringify(params);
        if (key === lastFetchKeyRef.current) return;
        lastFetchKeyRef.current = key;

        (async () => {
            setLoading(true);

            try {
                const res = await axiosClient.get("/get-predstave-filtered", {
                    params,
                    signal: ctrl.signal,
                });
                console.log("FROM API: ");
                console.log(res);

                const incoming = res.data?.data || [];
                setPredstave((prev) =>
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

    // search
    useEffect(() => {
        clearTimeout(searchDebounceRef.current);

        searchDebounceRef.current = setTimeout(() => {
            setFilters((prev) => {
                const nextSearch = searchInput.trim();

                // prevent unnecessary update
                if (prev.search === nextSearch) return prev;

                return {
                    ...prev,
                    search: nextSearch,
                    page: 1,
                };
            });
        }, 600);

        return () => clearTimeout(searchDebounceRef.current);
    }, [searchInput]);

    const onChangeMulti = (key) => (items) => {
        const ids = (items || []).map((x) => x.value);
        setFilters((prev) => ({ ...prev, [key]: ids, page: 1 }));
    };

    const selectedSort =
        SORT_OPTIONS.find((s) => s.value === filters.sort) || SORT_OPTIONS[0];

    const onSortChange = (opt) => {
        setFilters((prev) => ({
            ...prev,
            sort: opt?.value || "name_asc",
            page: 1,
        }));
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
            <div className="repertoar-filter-wrapper">
                <h5>Filtriraj predstave</h5>
                <InputGroup className="mb-5">
                    <InputGroup.Text id="basic-addon1">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Pretrazi predstave"
                        aria-label="seacrh"
                        aria-describedby="basic-addon1"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </InputGroup>
                <div className="repertoar-filter-gradovi-zanrovi-wrapper">
                    <div className="m-b-xs-20">
                        <Select
                            instanceId="znr"
                            name="zanrovi"
                            placeholder="Izaberi zanrove"
                            isMulti={true}
                            options={dbZanrovi}
                            onChange={onChangeMulti("zanrovi")}
                        />
                    </div>

                    <div className="m-b-xs-20">
                        <Select
                            instanceId="grd"
                            name="gradovi"
                            placeholder="Izaberi gradove"
                            isMulti={true}
                            options={dbGradovi}
                            onChange={onChangeMulti("gradovi")}
                        />
                    </div>
                </div>

                <div className="m-b-xs-20">
                    <Form.Label>Sortiraj po</Form.Label>
                    <Select
                        instanceId="srt"
                        name="sortBy"
                        placeholder="Sortiraj po"
                        options={SORT_OPTIONS}
                        value={selectedSort}
                        onChange={onSortChange}
                    />
                </div>
                <Form>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="recenzije-switch"
                        label="Prikazi samo predstave koje imaju recenziju"
                        onChange={() =>
                            setFilters((prev) => ({
                                ...prev,
                                hasReviews: !prev.hasReviews,
                                page: 1,
                            }))
                        }
                    />
                </Form>
            </div>
            {loading && (
                <Spinner
                    animation="border"
                    role="status"
                    className="hup-spinner"
                />
            )}
            <p>
                Prikazano {predstave?.length} od {meta?.total}
            </p>
            <div className="axil-content row">
                {predstave?.map((pred) => (
                    <div className="col-lg-6" key={pred.predstavaid}>
                        <PredstaveLayout
                            data={pred}
                            pClass=""
                            key={`pred${pred.predstavaid}`}
                            showPozoriste={true}
                        />
                    </div>
                ))}
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
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    return {
        props: {
            // No initial data fetching here, as we fetch data in the component
            // This allows us to use client-side fetching with axiosClient
        },
    };
});

PredstavePage.getLayoutProps = (pageProps) => ({
    header: <PredstaveHeader />,
});
