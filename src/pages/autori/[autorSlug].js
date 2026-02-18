import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import { useState } from "react";
import axiosClient from "../../utils/axios";
import { Spinner } from "react-bootstrap";
import AutorHeader from "../../components/post/post-format/elements/meta/AutorHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function PostAuthor({ autor }) {
    const [autorPosts, setAutorPosts] = useState(autor.tekstovi.data || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(autor.tekstovi.last_page || 1);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        if (currentPage >= totalPages) return;

        setLoading(true);
        try {
            const nextPage = currentPage + 1;
            const res = await axiosClient.get(
                `/get-single-autor/${autor.autor_slug}?page=${nextPage}`,
            );
            setAutorPosts((prev) => [...prev, ...res.data.tekstovi?.data]);
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
                    <div className="axil-content">
                        <h2 className="h3 m-b-xs-40">Tekstovi autorke</h2>
                        {autorPosts.map((data) => (
                            <PostLayoutTwo
                                data={data}
                                postSizeMd={true}
                                key={data.slug}
                            />
                        ))}
                        {!loading && currentPage < totalPages && (
                            <button
                                className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                                onClick={loadMore}
                            >
                                Učitaj još
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const { category, autorSlug } = context.params;
    const page = 1;
    console.log("getServerSideProps called with params:", context.params);
    const response = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/get-single-autor/${autorSlug}?page=${page}`,
    );

    const autor = response.data;
    console.log("Fetched autor data:", autor);

    return {
        props: {
            autor,
        },
    };
});

PostAuthor.getLayoutProps = (pageProps) => ({
    header: <AutorHeader autor={pageProps.autor} />,
});
