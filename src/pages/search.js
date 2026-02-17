import { useEffect, useState } from "react";
import SearchHeader from "../components/post/post-format/elements/meta/SearchHeader";
import { useRouter } from "next/router";
import axiosClient from "../utils/axios";
import RezultatiPretrage from "../components/post/layout/RezultatiPretrage";
import { Spinner } from "react-bootstrap";

const SearchPage = () => {
    const router = useRouter();
    const { query } = router.query;
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (query) {
            try {
                setLoading(true);
                axiosClient
                    .get(`/pretraga?query=${query}&page=${currentPage}`)
                    .then((res) => {
                        debugger;
                        setSearchResults((prevSearchResults) => [
                            ...prevSearchResults,
                            ...res.data.data,
                        ]);
                        setTotalPages(res.data.last_page || 1);
                        setLoading(false);
                    });
            } catch (error) {
                setLoading(false);
                console.error("Failed to search", error);
            }
        }
    }, [query, currentPage]);

    return (
        <>
            <div className="axil-about-us section-gap-top p-b-xs-20">
                <div className="container">
                    {loading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    )}
                    <p>Search results for: {query}</p>
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result) => (
                                <RezultatiPretrage
                                    data={result}
                                    key={result.id}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>No results found.</p>
                    )}

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
            </div>
        </>
    );
};

export default SearchPage;

SearchPage.getLayoutProps = (pageProps) => ({
    header: <SearchHeader />,
});
