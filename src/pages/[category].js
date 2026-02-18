import { useEffect, useRef, useState } from "react";
import axiosClient from "../utils/axios";
import { withSSRHandler } from "../utils/withSSRHandler";
import { Spinner } from "react-bootstrap";
import PostLayoutTwo from "../components/post/layout/PostLayoutTwo";
import CategoryHeader from "../components/post/post-format/elements/meta/CategoryHeader";

export default function Page({ categoryData, initialPosts, initTotalPages }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initTotalPages);
    const [posts, setPosts] = useState(initialPosts);

    const elementRef = useRef(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPosts(initialPosts);
        setCurrentPage(1);
    }, [categoryData.kategorija_slug]);

    const loadMore = async () => {
        if (currentPage >= totalPages) return;

        setLoading(true);
        try {
            const nextPage = currentPage + 1;
            const res = await axiosClient.get(
                `/get-category-posts/${categoryData.kategorija_slug}?page=${nextPage}`,
            );
            setPosts((prev) => [...prev, ...res.data.tekstovi?.data]);
            setCurrentPage(nextPage);
        } catch (err) {
            console.error("Failed to load more posts", err);
        }
        setLoading(false);
    };

    return (
        <>
            <div className="random-posts section-gap">
                <div className="container">
                    {loading && (
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
                            {!loading && (
                                <button
                                    className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                                    onClick={loadMore}
                                >
                                    Učitaj još
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
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/get-category-posts/${category}?page=${page}`,
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
