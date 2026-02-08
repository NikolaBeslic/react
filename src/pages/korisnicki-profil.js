import { withSSRHandler } from "../utils/withSSRHandler";
import axiosClient from "../utils/axios";
import KorisnickiProfil from "../components/korisnik/KorisnickiProfil";
import * as cookie from "cookie";
import KorisnikHeader from "../components/post/post-format/elements/meta/KorisnikHeader";

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
    const token = cookie.parse(cookies).token;

    const res = await axiosClient.get("/get-korisnicki-profil", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const korisnik = res.data;
    console.log(res.data);

    return {
        props: {
            korisnik,
        },
    };
});
