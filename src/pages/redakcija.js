import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import { Breadcrumb } from "react-bootstrap";
import TeamOne from "../components/team/TeamOne";
import { Spinner } from "react-bootstrap";
import { useStateContext } from "../contexts/StateContext";

const RedakcijaPage = () => {
    const [autori, setAutori] = useState([]);
    const { isLoading, showLoading, hideLoading } = useStateContext();

    useEffect(() => {
        showLoading();
        axiosClient
            .get("/get-autori")
            .then((res) => {
                console.log(res.data);
                setAutori(res.data.data);
                hideLoading();
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <HeadMeta metaTitle="Redakcija" />
            <Breadcrumb aPage="Redakcija" />
            <BreadcrumbBanner pageTitle="Redakcija" />
            <div className="axil-our-team section-gap">
                <div className="container">
                    {isLoading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    )}

                    {!isLoading && (
                        <p className="m-b-xs-30 big">
                            Redakciju portala Hoću (u) pozorište čine ljudi koji
                            vole pozorište i spremni su da volontiraju ne bi li
                            omogućili većem broju ljudi da čuje glas sa
                            pozorišnih dasaka. Naš tim pretežno čine studenti, i
                            to raznih oblasti (novinarstva, jezika, prava..),
                            ali imamo i starije kolege odavno svršene, a i mlađe
                            koji će tek krenuti akademskim putem. Geografski se
                            nalazimo na raznim stranama Srbije, u nekim
                            trenucima i sveta, tako da funkcionišemo pre svega
                            online komunikacijom. Bez obzira na to verujemo da
                            bez drugarstva nema ni dobrog rada, trudimo se da se
                            sretnemo što češće, odemo u pozorište ili na pivo.
                        </p>
                    )}
                    <div className="axil-team-grid-wrapper p-t-xs-10">
                        <div className="row">
                            {autori.map((data, index) => (
                                <div className="col-lg-4" key={index}>
                                    <TeamOne data={data} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RedakcijaPage;
