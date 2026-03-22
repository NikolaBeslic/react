import { useEffect, useMemo, useState } from "react";
import SearchHeader from "../components/post/post-format/elements/meta/SearchHeader";
import { useRouter } from "next/router";
import axiosClient from "../utils/axios";
import RezultatiPretrage from "../components/post/layout/RezultatiPretrage";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const PretragaPage = () => {
    const router = useRouter();
    const { query } = router.query;
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [meta, setMeta] = useState(null);

    useEffect(() => {
        setSearchResults([]);
        setCurrentPage(1);
        setTotalPages(1);
    }, [query]);

    useEffect(() => {
        if (!query || typeof query !== "string") return;

        const fetchResults = async () => {
            try {
                setLoading(true);

                const res = await axiosClient.get(
                    `/pretraga?query=${query}&page=${currentPage}`,
                );

                console.log(res.data);

                if (currentPage === 1) {
                    setSearchResults(res.data.data || []);
                } else {
                    setSearchResults((prev) => [...prev, ...res.data.data]);
                }

                setMeta({
                    currentPage: res.data.current_page,
                    lastPage: res.data.last_page,
                    total: res.data.total,
                });
            } catch (error) {
                console.error("Failed to search", error);
                toast.error("Greška učitavanja podataka. Pokušajte ponovo");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, currentPage]);

    const canLoadMore = useMemo(() => {
        if (!meta) return false;
        return meta.currentPage < meta.lastPage;
    }, [meta]);

    const loadMore = () => {
        if (!canLoadMore) return;
    };

    return (
        <>
            <div className="axil-about-us section-gap-top p-b-xs-20">
                {loading && (
                    <>
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    </>
                )}

                {searchResults.length > 0 ? (
                    <>
                        <p>
                            Rezultati pretrage za: <strong>{query}</strong>.
                            Priakzano {searchResults.length} od ukupno{" "}
                            {meta.total} rezultata.
                        </p>
                        <ul>
                            {searchResults.map((result) => (
                                <RezultatiPretrage
                                    data={result}
                                    key={result.id}
                                />
                            ))}
                        </ul>
                    </>
                ) : (
                    !loading && <p>Nema rezultata za traženi pojam.</p>
                )}

                {canLoadMore && (
                    <button
                        className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Učitaj još
                    </button>
                )}
            </div>
        </>
    );
};

export default PretragaPage;

PretragaPage.getLayoutProps = (pageProps) => ({
    header: <SearchHeader />,
});
