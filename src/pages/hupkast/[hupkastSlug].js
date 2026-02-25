import HeadMeta from "../../components/elements/HeadMeta";
import axiosClient from "../../utils/axios";
import PostFormatHupkast from "../../components/post/post-format/PostFormatHupkast";
import MetaDataHupkast from "../../components/post/post-format/elements/meta/MetaDataHupkast";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function SingleHupkast({ hupkast, relatedPosts }) {
    return (
        <>
            <HeadMeta metaTitle={hupkast.naslov} />
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

    return {
        props: {
            hupkast,
        },
    };
});

SingleHupkast.getLayoutProps = (pageProps) => ({
    header: <MetaDataHupkast metaData={pageProps.hupkast} />,
});
