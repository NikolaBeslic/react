import { useState } from "react";
import HeadMeta from "../../components/elements/HeadMeta";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from "react-bootstrap";
import HuPkastIndexLayout from "../../components/post/HuPkastIndexLayout";
import CategoryHeader from "../../components/post/post-format/elements/meta/CategoryHeader";

export default function HuPkast({ initialHuPkast, initTotalPages }) {
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [hupkast, setHupkast] = useState(initialHuPkast.tekstovi || []);
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
                    </div>
                </article>
            </main>
        </>
    );
}

export async function getServerSideProps(context) {
    const page = 1;
    console.log("getServerSideProps called with params:", context.params);
    const response = await axiosClient.get(`/get-hupkast?page=${page}`);

    console.log("Response data:", response.data);
    return {
        props: {
            initialHuPkast: response.data || [],
        },
    };
}

HuPkast.getLayoutProps = (pageProps) => ({
    header: <CategoryHeader categoryData={pageProps.initialHuPkast} />,
});
