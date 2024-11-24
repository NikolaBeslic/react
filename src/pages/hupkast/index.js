import { useEffect, useState } from "react";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from 'react-bootstrap';
import HuPkastIndexLayout from "../../components/post/HuPkastIndexLayout";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetNewsletter from "../../components/widget/WidgetNewsletter";
import WidgetInstagram from "../../components/widget/WidgetInstagram";

export default function HuPkast() {

    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [hupkast, setHupkast] = useState([]);
    useEffect(() => {
        showLoading();
        axiosClient.get('/get-hupkast').then((res) => {
            console.log(res.data);
            setHupkast(res.data);
            hideLoading();
        }).catch(error => console.error(error));
    }, []);

    return (
        <>
            <HeadMeta metaTitle="HuPkast" />
            <HeaderOne />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">HuPkast</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <article className="post-details">
                                    <div className="single-blog-wrapper">
                                        {isLoading && <Spinner animation="border" role="status" className='hup-spinner' />}

                                        {hupkast.map((hup) =>
                                            <HuPkastIndexLayout hupkastData={hup} key={hup.tekstid} />
                                        )}
                                    </div>
                                </article>
                            </main>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                {/* <RelatedPosts relatedPosts={sidePosts} /> */}
                                {/* <WidgetPost posts={sidePosts} /> */}
                                <WidgetNewsletter />
                                <WidgetInstagram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterOne />
        </>
    );
}