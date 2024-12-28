import { useEffect, useState } from "react";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import axiosClient from "../../utils/axios";
import FestivaliLayout from "../../components/post/layout/FestivaliLayout";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from "react-bootstrap";

export default function FestivaliPage() {
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [festivali, setFestivali] = useState([]);
    useEffect(() => {
        axiosClient
            .get("/get-festivali")
            .then((res) => {
                console.log(res.data);
                setFestivali(res.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <HeadMeta metaTitle="Festivali" />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    Festivali
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="random-posts section-gap">
                <div className="container">
                    {isLoading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    )}
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="axil-content row">
                                {festivali.map((festival) => (
                                    <FestivaliLayout
                                        data={festival}
                                        pClass=""
                                        videoIcon={false}
                                        key={festival.festivalid}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
