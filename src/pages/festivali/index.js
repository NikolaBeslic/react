import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import FestivaliLayout from "../../components/post/layout/FestivaliLayout";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from "react-bootstrap";
import FestivaliHeader from "../../components/post/post-format/elements/meta/FestivaliHeader";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function FestivaliPage({ initialFestivali }) {
    const { isLoading, showLoading, hideLoading } = useStateContext();

    const [festivali, setFestivali] = useState(initialFestivali.data || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(
        initialFestivali.last_page || 1
    );

    const loadMore = async () => {
        if (currentPage >= totalPages) return;

        showLoading(true);
        try {
            const nextPage = currentPage + 1;
            const res = await axiosClient.get(
                `/get-festivali?page=${nextPage}`
            );
            setFestivali((prev) => [...prev, ...res.data.data]);
            setCurrentPage(nextPage);
        } catch (err) {
            console.error("Failed to load more posts", err);
        }
        hideLoading();
    };

    return (
        <>
            <div className="random-posts section-gap">
                <div className="container">
                    {isLoading && (
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
                        {!isLoading && (
                            <button
                                className="btn btn-primary btn-small"
                                onClick={loadMore}
                            >
                                Ucitaj jos
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
