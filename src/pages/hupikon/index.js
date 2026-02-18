import { useState } from "react";
import axiosClient from "../../utils/axios";
import { Breadcrumb, Spinner } from "react-bootstrap";
import HupikonIndexLayout from "../../components/post/layout/HupikonIndexLayout";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CategoryHeader from "../../components/post/post-format/elements/meta/CategoryHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function Hupikon({ initialHuPikon, initTotalPages }) {
    const [loading, setLoading] = useState(false);
    const [hupikonPosts, setHupikonPosts] = useState(
        initialHuPikon.tekstovi || [],
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initTotalPages);

    // useEffect(() => {
    //     showLoading();
    //     axiosClient
    //         .get(`/get-hupikon?page=${currentPage}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             setHupikon((prevHuPikon) => [...prevHuPikon, ...res.data.data]);

    //             setTotalPages(res.data.last_page);
    //             hideLoading();
    //         })
    //         .catch((error) => console.error(error));
    // }, [currentPage]);

    const loadMore = async () => {
        if (currentPage >= totalPages) return;

        setLoading(true);
        try {
            const nextPage = currentPage + 1;
            const res = await axiosClient.get(`/get-hupikon?page=${nextPage}`);
            setHupikonPosts((prev) => [...prev, ...res.data.tekstovi]);
            setCurrentPage(nextPage);
        } catch (err) {
            console.error("Failed to load more posts", err);
        }
        setLoading(false);
    };

    return (
        <>
            <article className="post-details">
                <div className="random-posts section-gap">
                    <div className="axil-content">
                        <div className="row">
                            {loading && (
                                <Spinner
                                    animation="border"
                                    role="status"
                                    className="hup-spinner"
                                />
                            )}
                            <div className="masonry-grid">
                                <ResponsiveMasonry
                                    columnsCountBreakPoints={{
                                        575: 1,
                                        576: 2,
                                        991: 2,
                                    }}
                                >
                                    <Masonry gutter="0 40px">
                                        {hupikonPosts.map((hup, index) => (
                                            <div
                                                className="grid-item"
                                                key={hup.slug}
                                            >
                                                <HupikonIndexLayout
                                                    data={hup}
                                                    index={index}
                                                />
                                            </div>
                                        ))}
                                    </Masonry>
                                </ResponsiveMasonry>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                            onClick={loadMore}
                        >
                            Učitaj još
                        </button>
                    </div>
                </div>
            </article>
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const page = 1;
    console.log("getServerSideProps called with params:", context.params);
    const response = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/get-hupikon?page=${page}`,
    );

    console.log("Response data:", response.data);
    return {
        props: {
            initialHuPikon: response.data || [],
        },
    };
});

Hupikon.getLayoutProps = (pageProps) => ({
    header: <CategoryHeader categoryData={pageProps.initialHuPikon} />,
});
