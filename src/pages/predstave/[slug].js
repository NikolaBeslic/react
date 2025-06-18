import * as cookie from "cookie";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import Predstava from "../../components/predstave/Predstava";
import PredstavaTitle from "../../components/post/post-format/elements/meta/PredstavaTitle";

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
            <Predstava data={predstavaData} updateData={handleDataUpdate} />
        </>
    );
}

PredstavaPage.getLayoutProps = (pageProps) => ({
    header: <PredstavaTitle metaData={pageProps.predstavaData} />,
});

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const cookies = context.req.headers.cookie;
    const token = cookie.parse(cookies).token;

    const res = await axiosClient.get(`/predstava-single/${slug}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const predstavaData = res.data.data;

    return {
        props: {
            predstavaData,
        },
    };
}
