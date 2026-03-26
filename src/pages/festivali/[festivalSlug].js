import axiosClient from "../../utils/axios";
import PostFormatFestival from "../../components/post/post-format/PostFormatFestival";
import MetaDataFestival from "../../components/post/post-format/elements/meta/MetaDataFestival";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function FestivalPage({ festival }) {
    //

    return (
        <>
            <PostFormatFestival postData={festival} />{" "}
        </>
    );
}

export const getServerSideProps = withSSRHandler(async (context) => {
    const { festivalSlug } = context.params;
    const page = 1;
    const response = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/festival-single/${festivalSlug}`,
    );
    const festival = response.data;

    return {
        props: {
            festival,
        },
    };
});

FestivalPage.getLayoutProps = (pageProps) => ({
    header: <MetaDataFestival metaData={pageProps.festival} />,
});
