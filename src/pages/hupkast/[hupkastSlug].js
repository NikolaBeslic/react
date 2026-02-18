import HeadMeta from "../../components/elements/HeadMeta";
import { Breadcrumb } from "react-bootstrap";
import axiosClient from "../../utils/axios";
import PostFormatHupkast from "../../components/post/post-format/PostFormatHupkast";
import MetaDataHupkast from "../../components/post/post-format/elements/meta/MetaDataHupkast";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function SingleHupkast({ hupkast, relatedPosts }) {
    // useEffect(() => {
    //     const fetchSingleHupkast = async () => {
    //         axiosClient
    //             .get(`/hupkast-single/${router.query.hupkastSlug}`)
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setHupkast(res.data);
    //             })
    //             .catch((error) => console.error(error));
    //     };
    //     if (hupkastSlug) {
    //         fetchSingleHupkast();
    //     }
    // }, [hupkastSlug]);

    return (
        <>
            <HeadMeta metaTitle={hupkast.naslov} />
            <Breadcrumb bCat="HuPkast" aPage={hupkast.naslov} />
            <PostFormatHupkast postData={hupkast} />
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const { hupkastSlug } = context.params;
    console.log("getServerSideProps called with params:", context.params);
    const response = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/hupkast-single/${hupkastSlug}`,
    );

    const hupkast = response.data;
    console.log("Fetched post data:", hupkast);

    const releatedResponse = await axiosClient.get(
        `/get-related-posts/${hupkast.tekstid}`,
    );
    const relatedPosts = releatedResponse.data;

    return {
        props: {
            hupkast,
            relatedPosts,
        },
    };
});

SingleHupkast.getLayoutProps = (pageProps) => ({
    header: <MetaDataHupkast metaData={pageProps.hupkast} />,
});
