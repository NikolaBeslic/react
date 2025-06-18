import axiosClient from "../../utils/axios";
import Pozoriste from "../../components/pozorista/Pozoriste";
import PozoristeSingleHeader from "../../components/post/post-format/elements/meta/PozoristeSingleHeader";
import * as cookie from "cookie";

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

export async function getServerSideProps(context) {
    const { pozoristeSlug } = context.params;
    const cookies = context.req.headers.cookie;
    const token = cookie.parse(cookies).token;
    const res = await axiosClient.get(`/pozoriste-single/${pozoristeSlug}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = res.data;

    return {
        props: {
            data,
        },
    };
}
