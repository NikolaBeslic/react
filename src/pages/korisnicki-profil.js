import { withSSRHandler } from "../utils/withSSRHandler";
import axiosClient from "../utils/axios";
import KorisnickiProfil from "../components/korisnik/KorisnickiProfil";
import KorisnikHeader from "../components/post/post-format/elements/meta/KorisnikHeader";
import { enableCursor } from "@fullcalendar/core/internal";

export default function KorisnikPage({ korisnik }) {
    return (
        <>
            <KorisnickiProfil korisnik={korisnik} />
        </>
    );
}

KorisnikPage.getLayoutProps = (pageProps) => ({
    header: <KorisnikHeader korisnik={pageProps.korisnik} />,
});

export const getServerSideProps = withSSRHandler(async (context) => {
    const cookies = context.req.headers.cookie || "";

    const res = await axiosClient.get(
        `${process.env.NEXT_PUBLIC_SSR_API_URL}/get-korisnicki-profil`,
        {
            headers: {
                cookie: cookies,
                origin: process.env.NEXT_PUBLIC_SSR_REQ_ORIGIN,
            },
            withCredentials: true,
        },
    );

    console.log(res.data);

    return { props: { korisnik: res.data } };
});
