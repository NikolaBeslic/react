import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";
import { useStateContext } from "../contexts/StateContext";
import HeadMeta from "../components/elements/HeadMeta";
import Breadcrumb from "../components/common/Breadcrumb";
import KorisnickiProfil from "../components/korisnik/KorisnickiProfil";

const KorisnikPage = () => {
    const [korisnik, setKorisnik] = useState([]);
    const { isLoading, showLoading, hideLoading } = useStateContext();

    useEffect(() => {
        showLoading();
        axiosClient
            .get("/get-korisnicki-profil", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setKorisnik(res.data);
                hideLoading();
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <HeadMeta metaTitle="Korisnicki profil" />
            <Breadcrumb aPage="Korisnicki profil" />
            <KorisnickiProfil korisnik={korisnik} />
        </>
    );
};

export default KorisnikPage;
