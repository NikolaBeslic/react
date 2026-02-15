import * as cookie from "cookie";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import Predstava from "../../components/predstave/Predstava";
import PredstavaTitle from "../../components/post/post-format/elements/meta/PredstavaTitle";
import { withSSRHandler } from "../../utils/withSSRHandler";

export default function PredstavaPage({ predstavaData }) {
    const [predstava, setPredstava] = useState(predstavaData);

    const handleDataUpdate = (updatedData) => {
        setPredstava(updatedData);
    };

    const updateListaZelja = () => {
        setPredstava({ ...predstava, naListiZeljaKorisnika: 1 });
    };

    const updateListaOdgledanih = () => {
        setPredstava({ ...predstava, naListiOdgledanihKorisnika: 1 });
    };

    return (
        <>
            <Predstava
                data={predstavaData}
                updateData={handleDataUpdate}
                key={`predsingl-${predstava.predstavaid}`}
            />
        </>
    );
}

PredstavaPage.getLayoutProps = (pageProps) => ({
    header: <PredstavaTitle metaData={pageProps.predstavaData} />,
    noSidebar: true,
});

export const getServerSideProps = withSSRHandler(async (context) => {
    const { slug } = context.params;
    const cookies = context.req.headers.cookie || "";

    const res = await axiosClient.get(`/predstava-single/${slug}`, {
        headers: {
            cookie: cookies,
            origin: process.env.NEXT_PUBLIC_SSR_REQ_ORIGIN,
        },
        withCredentials: true,
    });
    const predstavaData = res.data;

    return {
        props: {
            predstavaData,
        },
    };
});
