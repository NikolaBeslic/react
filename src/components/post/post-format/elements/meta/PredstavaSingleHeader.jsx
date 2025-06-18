import HeadMeta from "../../../../elements/HeadMeta";
import Breadcrumb from "../../../../common/Breadcrumb";
import { Button, Spinner } from "react-bootstrap";
import { useStateContext } from "../../../../../contexts/StateContext";
import { useState } from "react";
import axiosClient from "../../../../../utils/axios";

const PozoristeSingleHeader = ({ data }) => {
    return (
        <>
            <HeadMeta metaTitle={data.naziv_pozorista} />
            <Breadcrumb bCat="Pozorista" aPage={data.naziv_pozorista} />
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
                            {omiljenoKorisnika ? (
                                <Button
                                    variant="primary"
                                    className="btn btn-secondary btn-small"
                                    disabled
                                >
                                    <i className="fa-solid fa-heart"></i>
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
                                        <i className="fa-regular fa-heart"></i>
                                    )}{" "}
                                    Dodaj u omiljena
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PozoristeSingleHeader;
