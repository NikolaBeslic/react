import { useEffect, useRef, useState } from "react";
import axiosClient from "../utils/axios";
import { withSSRHandler } from "../utils/withSSRHandler";
import { Spinner } from "react-bootstrap";
import PostLayoutTwo from "../components/post/layout/PostLayoutTwo";
import { useStateContext } from "../contexts/StateContext";
import CategoryHeader from "../components/post/post-format/elements/meta/CategoryHeader";

export default function Page({ categoryData, initialPosts, initTotalPages }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initTotalPages);
    const [posts, setPosts] = useState(initialPosts);

    const elementRef = useRef(null);
    const { isLoading, showLoading, hideLoading } = useStateContext();

    useEffect(() => {
        setPosts(initialPosts);
        setCurrentPage(1);
    }, [categoryData.kategorija_slug]);

    const loadMore = async () => {
        if (currentPage >= totalPages) return;

        showLoading(true);
        try {
            const nextPage = currentPage + 1;
            const res = await axiosClient.get(
                `/get-category-posts/${categoryData.kategorija_slug}?page=${nextPage}`
            );
            setPosts((prev) => [...prev, ...res.data.tekstovi?.data]);
            setCurrentPage(nextPage);
        } catch (err) {
            console.error("Failed to load more posts", err);
        }
        hideLoading();
    };

    return (
        <>
            {/* Banner End here  */}
            <div className="random-posts section-gap">
                <div className="container">
                    {isLoading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    )}
                    <>
                        <div className="axil-content" ref={elementRef}>
                            {posts.map((data) => (
                                <PostLayoutTwo
                                    data={data}
                                    postSizeMd={true}
                                    key={data.slug}
                                />
                            ))}
                            {!isLoading && (
                                <button
                                    className="btn btn-primary btn-small"
                                    onClick={loadMore}
                                >
                                    Ucitaj jos
                                </button>
                            )}
                        </div>
                    </>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const { category } = context.params;
    const page = 1;
    console.log("getServerSideProps called with params:", context.params);
    const response = await axiosClient.get(
        `/get-category-posts/${category}?page=${page}`
    );
    const categoryData = response.data;
    console.log("Response data:", categoryData);
    return {
        props: {
            categoryData,
            initialPosts: categoryData.tekstovi?.data || [],
            initTotalPages: categoryData.tekstovi?.last_page || 0,
        },
    };
});

Page.getLayoutProps = (pageProps) => ({
    header: <CategoryHeader categoryData={pageProps.categoryData} />,
});
