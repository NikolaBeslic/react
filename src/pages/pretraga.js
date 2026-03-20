import { useEffect, useState } from "react";
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

                if (currentPage === 1) {
                    setSearchResults(res.data.data || []);
                } else {
                    setSearchResults((prev) => [...prev, ...res.data.data]);
                }

                setTotalPages(res.data.last_page || 1);
            } catch (error) {
                console.error("Failed to search", error);
                toast.error("Neka greška se dogodila");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, currentPage]);

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
                {!loading &&
                    (searchResults.length > 0 ? (
                        <>
                            <p>
                                Rezultati pretrage za: <strong>{query}</strong>.
                                Ukupno {searchResults.length} rezultata.
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
                        <p>Nema rezultat.</p>
                    ))}

                {loading &&
                    searchResults.length > 0 &&
                    currentPage < totalPages && (
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
