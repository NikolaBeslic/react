import { useEffect, useState } from "react";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import axiosClient from "../../utils/axios";
import { Breadcrumb, Spinner } from "react-bootstrap";
import PozoristaLayout from "../../components/post/layout/PozoristaLayout";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import { useStateContext } from "../../contexts/StateContext";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetPremijere from "../../components/widget/WidgetPremijere";

export default function PozoristaPage() {
    const [pozorista, setPozorista] = useState([]);
    const [sidePosts, setSidePosts] = useState([]);
    const [premijere, setPremijere] = useState([]);
    const { isLoading, showLoading, hideLoading } = useStateContext();

    useEffect(() => {
        showLoading();
        axiosClient
            .get("/get-all-pozorista")
            .then((res) => {
                console.log(res.data);
                setPozorista(res.data);
                fetchSidePosts();
                fetchPremijere();
                hideLoading();
            })
            .catch((error) => console.error(error));
    }, []);

    const fetchSidePosts = () => {
        axiosClient
            .get(`/get-trending-posts`)
            .then((res) => {
                setSidePosts(res.data);
            })
            .catch((error) => console.error(error));
    };

    const fetchPremijere = () => {
        axiosClient
            .get(`/get-premijere`)
            .then((res) => {
                setPremijere(res.data);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <HeadMeta metaTitle="Pozorišta" />
            <Breadcrumb aPage="Predstave" />
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    Pozorišta
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End here  */}
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="axil-content row">
                                {isLoading && (
                                    <Spinner
                                        animation="border"
                                        role="status"
                                        className="hup-spinner"
                                    />
                                )}
                                {pozorista.map((pozoriste) => (
                                    <PozoristaLayout
                                        pozoriste={pozoriste}
                                        key={pozoriste.pozoristeid}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetPost posts={sidePosts} />
                                <WidgetSocialShare />
                                <WidgetPremijere premijere={premijere} />
                                {/* <WidgetCategory cateData={allPosts} />
                                    <WidgetPost dataPost={allPosts} /> */}
                                <WidgetAd
                                    img="/images/clientbanner/clientbanner3.jpg"
                                    height={492}
                                    width={320}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
