import { useState } from "react";
import HeadMeta from "../../components/elements/HeadMeta";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from "react-bootstrap";
import HuPkastIndexLayout from "../../components/post/HuPkastIndexLayout";
import CategoryHeader from "../../components/post/post-format/elements/meta/CategoryHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function HuPkast({ initialHuPkast, initTotalPages }) {
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initTotalPages);
    const [hupkast, setHupkast] = useState(initialHuPkast.tekstovi.data || []);
    // useEffect(() => {
    //     showLoading();
    //     axiosClient
    //         .get("/get-hupkast")
    //         .then((res) => {
    //             console.log(res.data);
    //             setHupkast(res.data);
    //             hideLoading();
    //         })
    //         .catch((error) => console.error(error));
    // }, []);

    const loadMore = async () => {
        if (currentPage >= totalPages) return;

        showLoading(true);
        try {
            const nextPage = currentPage + 1;
            const res = await axiosClient.get(`/get-hupkast?page=${nextPage}`);
            console.log("Loaded more hupkast data:", res.data);
            setHupkast((prev) => [...prev, ...res.data.tekstovi.data]);
            setCurrentPage(nextPage);
        } catch (err) {
            console.error("Failed to load more posts", err);
        }
        hideLoading();
    };
    return (
        <>
            <HeadMeta metaTitle="HuPkast" />

            <main className="site-main">
                <article className="post-details">
                    <div className="single-blog-wrapper">
                        {isLoading && (
                            <Spinner
                                animation="border"
                                role="status"
                                className="hup-spinner"
                            />
                        )}

                        {hupkast.map((hup) => (
                            <HuPkastIndexLayout
                                hupkastData={hup}
                                key={hup.tekstid}
                            />
                        ))}
                        {!isLoading && currentPage < totalPages && (
                            <button
                                className="btn btn-primary btn-small"
                                onClick={loadMore}
                            >
                                Ucitaj jos
                            </button>
                        )}
                    </div>
                </article>
            </main>
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const page = 1;
    console.log("getServerSideProps called with params:", context.params);
    const response = await axiosClient.get(`/get-hupkast?page=${page}`);

    console.log("Response data:", response.data);
    return {
        props: {
            initialHuPkast: response.data || [],
            initTotalPages: response.data?.tekstovi.last_page || 1,
        },
    };
});

HuPkast.getLayoutProps = (pageProps) => ({
    header: <CategoryHeader categoryData={pageProps.initialHuPkast} />,
});
