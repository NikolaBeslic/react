import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import FestivaliLayout from "../../components/post/layout/FestivaliLayout";
import { Spinner } from "react-bootstrap";
import FestivaliHeader from "../../components/post/post-format/elements/meta/FestivaliHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function FestivaliPage({ initialFestivali }) {
    const [loading, setLoading] = useState(false);

    const [festivali, setFestivali] = useState(initialFestivali.data || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(
        initialFestivali.last_page || 1,
    );

    const loadMore = async () => {
        if (currentPage >= totalPages) return;

        setLoading(true);
        try {
            const nextPage = currentPage + 1;
            const res = await axiosClient.get(
                `/get-festivali?page=${nextPage}`,
            );
            setFestivali((prev) => [...prev, ...res.data.data]);
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

                    <div className="axil-content row">
                        {festivali.map((festival) => (
                            <FestivaliLayout
                                data={festival}
                                pClass=""
                                videoIcon={false}
                                key={festival.festivalid}
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
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const response = await axiosClient.get("/get-festivali");

    const festivali = response.data;
    console.log("Fetched festivali data:", festivali);

    return {
        props: {
            initialFestivali: festivali,
        },
    };
});

FestivaliPage.getLayoutProps = (pageProps) => ({
    header: <FestivaliHeader />,
});
