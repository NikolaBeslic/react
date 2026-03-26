import { useMemo, useEffect, useRef, useState } from "react";
import axiosClient from "../../utils/axios";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import PredstaveLayout from "../../components/post/layout/PredstaveLayout";
import Select from "react-select";
import PredstaveHeader from "../../components/post/post-format/elements/meta/PredstaveHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";
import { useRouter } from "next/router";
import { toIntArray } from "../../utils";
import toast from "react-hot-toast";

export default function PredstavePage() {
    const [predstave, setPredstave] = useState([]);
    const [dbGradovi, setDbGradovi] = useState([]);
    const [dbZanrovi, setDbZanrovi] = useState([]);
    const [loading, setLoading] = useState([]);
    const [optionsLoading, setOptionsLoading] = useState(false);
    const [routerReadyFilters, setRouterReadyFilters] = useState(false);
    const router = useRouter();
    const SORT_OPTIONS = [
        { value: "name_asc", label: "Naziv (A-Z)" },
        { value: "rating_desc", label: "Ocena (najviše)" },
        { value: "premijera", label: "Premijera (najnovije)" },
        { value: "komentari", label: "Broju komentara (opadajuće)" },
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
    const selectedZanrovi = dbZanrovi.filter((z) =>
        filters.zanrovi.includes(z.value),
    );
    const selectedGradovi = dbGradovi.filter((g) =>
        filters.gradovi.includes(g.value),
    );
    const [searchInput, setSearchInput] = useState(filters.search);

    // initial fetching gradovi, and zanrovi
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

    // getting filter data from url
    useEffect(() => {
        if (!router.isReady) return;

        setFilters((prev) => ({
            ...prev,
            gradovi: toIntArray(router.query.gradovi),
            zanrovi: toIntArray(router.query.zanrovi),
            hasReviews: router.query.hasReviews,
            sort: router.query.sort,
            page: 1,
        }));
        setRouterReadyFilters(true);
    }, [
        router.isReady,
        router.query.hasReviews,
        router.query.sort,
        router.query.zanrovi,
        router.query.gradovi,
    ]);

    // Fetch predstave whenever filters change
    const lastFetchKeyRef = useRef("");
    useEffect(() => {
        const ctrl = new AbortController();
        if (!routerReadyFilters) return;

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
                if (e.name !== "CanceledError" && e.name !== "AbortError") {
                    console.error(e);
                    toast.error(
                        "Desila se greška prilikom učitavanja. Refrešujte stranicu.",
                    );
                }
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
            <div className="single-blog-wrapper p-t-md-60 p-t-xs-30">
                <div className="repertoar-filter-wrapper">
                    <h5>Filtriraj predstave</h5>
                    {optionsLoading && <Spinner />}
                    <InputGroup className="mb-5">
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Pretraži predstave"
                            aria-label="seacrh"
                            aria-describedby="basic-addon1"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </InputGroup>
                    <div className="repertoar-filter-gradovi-zanrovi-wrapper">
                        <div className="m-b-xs-25 m-b-lg-0">
                            <Select
                                instanceId="znr"
                                name="zanrovi"
                                placeholder="Izaberi žanrove"
                                isMulti={true}
                                options={dbZanrovi}
                                value={selectedZanrovi}
                                onChange={onChangeMulti("zanrovi")}
                                className="repertoari-filter-select"
                            />
                        </div>

                        <div className="m-b-xs-20 m-b-lg-0">
                            <Select
                                instanceId="grd"
                                name="gradovi"
                                placeholder="Izaberi gradove"
                                isMulti={true}
                                options={dbGradovi}
                                value={selectedGradovi}
                                onChange={onChangeMulti("gradovi")}
                                className="repertoari-filter-select"
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
                            className="predstave-filter-select-sort"
                        />
                    </div>
                    <Form>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="recenzije-switch"
                            label="Prikaži samo predstave koje imaju recenziju"
                            checked={filters.hasReviews}
                            onChange={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    hasReviews: !prev.hasReviews,
                                    page: 1,
                                }))
                            }
                            className="predstave-index-filter-checkbox"
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

                {!loading && (
                    <p>
                        Prikazano {predstave?.length} od {meta?.total}
                    </p>
                )}
                <div className="axil-content row">
                    {predstave?.map((pred) => (
                        <div className="col-lg-12" key={pred.predstavaid}>
                            <PredstaveLayout
                                data={pred}
                                pClass=""
                                key={`pred${pred.predstavaid}`}
                                showPozoriste={true}
                                showRatingsAndComments={true}
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
