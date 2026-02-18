import axiosClient from "../../utils/axios";
import Pozoriste from "../../components/pozorista/Pozoriste";
import PozoristeSingleHeader from "../../components/post/post-format/elements/meta/PozoristeSingleHeader";
import * as cookie from "cookie";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function PozoristePage({ data }) {
    return (
        <>
            <Pozoriste data={data} />
        </>
    );
}

PozoristePage.getLayoutProps = (pageProps) => ({
    header: <PozoristeSingleHeader data={pageProps.data} />,
});

export const getServerSideProps = withSSRHandler(async (context) => {
    const { pozoristeSlug } = context.params;
    const cookies = context.req.headers.cookie || "";
    const res = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/pozoriste-single/${pozoristeSlug}`,
        {
            headers: {
                cookie: cookies,
                origin: process.env.NEXT_PUBLIC_SSR_REQ_ORIGIN,
            },
            withCredentials: true,
        },
    );
    const data = res.data;

    return {
        props: {
            data,
        },
    };
});
