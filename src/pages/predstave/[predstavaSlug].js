import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import Predstava from "../../components/predstave/Predstava";
import PredstavaTitle from "../../components/post/post-format/elements/meta/PredstavaTitle";
import { withSSRHandler } from "../../utils/withSSRHandler";
import { useUser } from "../../contexts/UserContext";
import { csrf, getCookieValue } from "../../utils";

export default function PredstavaPage(pageProps) {
    const [predstava, setPredstava] = useState(pageProps.predstavaData);
    const { user, setModalOpen } = useUser();

    const handleDataUpdate = (updatedData) => {
        debugger;
        setPredstava(updatedData);
    };

    const [ratingLoading, setRatingLoading] = useState(false);
    const handleRating = async (value) => {
        if (!user) {
            alert("Ulogujte se da biste mogli da ocenite predstavu.");
            setModalOpen(true);
            return;
        }
        setRatingLoading(true);

        await csrf();
        axiosClient
            .post(
                "/predstava/oceni",
                {
                    ocena: value,
                    user: user,
                    predstavaid: predstava.predstavaid,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((res) => {
                console.log(res.data);
                setPredstava((prev) => ({
                    ...prev,
                    brojOcena: res.data.brojOcena,
                    ocenaKorisnika: res.data.ocenaKorisnika,
                    prosecnaOcena: res.data.prosecnaOcena,
                }));
                setRatingLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const [naListiZeljaLoading, setNaListiZeljaLoading] = useState(false);
    const handleDodajNaListuZelja = async () => {
        if (!user) {
            alert("You must be logged in to rate a post.");
            return;
        }
        setNaListiZeljaLoading(true);
        await csrf();
        axiosClient
            .post(
                "/predstava/dodajNaListuZelja",
                {
                    user: user,
                    predstavaid: predstava.predstavaid,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((res) => {
                console.log(res);
                setPredstava((prev) => ({
                    ...prev,
                    naListiZeljaKorisnika: true,
                }));
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setNaListiZeljaLoading(false));
    };

    const [odgledaneLoading, setOdgledaneLoading] = useState(false);
    const handleDodajUOdgledane = async () => {
        if (!user) {
            alert("You must be logged in to do this");
            return;
        }
        setOdgledaneLoading(true);
        await csrf();
        axiosClient
            .post(
                "/predstava/dodajUOdgledane",
                {
                    user: user,
                    predstavaid: predstava.predstavaid,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((res) => {
                console.log(res);
                setPredstava((prev) => ({
                    ...prev,
                    naListiOdgledanihKorisnika: true,
                }));
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setOdgledaneLoading(false));
    };

    return (
        <>
            <PredstavaTitle
                metaData={predstava}
                ratingLoading={ratingLoading}
                handleRating={handleRating}
                naListiZeljaLoading={naListiZeljaLoading}
                handleDodajNaListuZelja={handleDodajNaListuZelja}
                odgledaneLoading={odgledaneLoading}
                handleDodajUOdgledane={handleDodajUOdgledane}
            />
            <Predstava
                data={predstava}
                updateData={handleDataUpdate}
                key={`predsingl-${predstava.predstavaid}`}
            />
        </>
    );
}

PredstavaPage.getLayoutProps = (pageProps) => ({
    noSidebar: true,
});

export const getServerSideProps = withSSRHandler(async (context) => {
    const { predstavaSlug } = context.params;
    const cookies = context.req.headers.cookie || "";

    const res = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/predstava-single/${predstavaSlug}`,
        {
            headers: {
                cookie: cookies,
                origin: process.env.NEXT_PUBLIC_SSR_REQ_ORIGIN,
            },
            withCredentials: true,
        },
    );
    console.log(res.data);
    const predstavaData = res.data;

    return {
        props: {
            predstavaData,
        },
    };
});
