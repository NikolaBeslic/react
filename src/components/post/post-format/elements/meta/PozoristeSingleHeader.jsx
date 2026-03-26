import HeadMeta from "../../../../elements/HeadMeta";
import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import axiosClient from "../../../../../utils/axios";
import { useUser } from "../../../../../contexts/UserContext";
import { csrf, getCookieValue } from "../../../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

const PozoristeSingleHeader = ({ data }) => {
    const { user } = useUser();
    const [omiljenaLoading, setOmiljenaLoading] = useState(false);
    const [omiljenoKorisnika, setOmiljenoKorisnika] = useState(
        data.omiljenoKorisnika,
    );
    const handleDodajUOmiljena = async () => {
        if (!user) {
            alert("Ulogujte se da dodate omiljeno pozorište");
            return;
        }
        setOmiljenaLoading(true);
        await csrf();

        axiosClient
            .post(
                "/pozorista/dodajUOmiljena",
                { pozoristeId: data.pozoristeid },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                },
            )
            .then((res) => {
                setOmiljenaLoading(false);
                setOmiljenoKorisnika(true);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <HeadMeta
                metaTitle={data.seo_title}
                metaDescription={data.seo_description}
                metaUrl={data.seo_url}
                metaImage={data.seo_image}
            />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="post-title-wrapper">
                                <h1 className="m-b-xs-0 axil-post-title hover-line">
                                    {data.naziv_pozorista}
                                </h1>
                                <div className="post-metas banner-post-metas m-t-xs-20">
                                    <ul className="list-inline">
                                        <li>
                                            <i className="fa-regular fa-location-dot"></i>
                                            {data.adresa}
                                        </li>
                                        <li>
                                            <i className="fa-regular fa-phone"></i>
                                            {data.telefon}
                                        </li>
                                        <li>
                                            <i className="fa-regular fa-at"></i>
                                            {data.email}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="pozoriste-button-wrapper">
                                {omiljenoKorisnika ? (
                                    <Button
                                        variant="primary"
                                        className="btn btn-primary btn-small"
                                        disabled
                                    >
                                        <FontAwesomeIcon icon={faSolidHeart} />
                                        Omiljeno pozoriste
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        className="btn btn-primary btn-small"
                                        onClick={handleDodajUOmiljena}
                                    >
                                        {omiljenaLoading ? (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                role="status"
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faHeart} />
                                        )}{" "}
                                        Dodaj u omiljena
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PozoristeSingleHeader;
