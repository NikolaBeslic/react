import { useEffect, useState } from "react";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from 'react-bootstrap';
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetNewsletter from "../../components/widget/WidgetNewsletter";
import WidgetInstagram from "../../components/widget/WidgetInstagram";
import HupikonIndexLayout from "../../components/post/layout/HupikonIndexLayout";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Hupikon() {

    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [hupikon, setHupikon] = useState([]);
    useEffect(() => {
        showLoading();
        axiosClient.get('/get-hupikon')
            .then((res) => {
                console.log(res.data);
                setHupikon(res.data);
                hideLoading();
            }).catch(error => console.error(error));
    }, []);

    return (
        <>
            <HeadMeta metaTitle="HuPikon" />
            <HeaderOne />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">HuPikon</h2>
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

                                    <div className="row gutter-40">
                                        {isLoading && <Spinner animation="border" role="status" className='hup-spinner' />}
                                        <div className="masonry-grid">
                                            <ResponsiveMasonry columnsCountBreakPoints={{ 575: 1, 576: 2, 991: 2 }}>
                                                <Masonry gutter="0 40px">
                                                    {hupikon.map((hup, index) =>
                                                        <div className="grid-item" key={hup.slug}>
                                                            <HupikonIndexLayout data={hup} index={index} />
                                                        </div>
                                                    )}
                                                </Masonry>
                                            </ResponsiveMasonry>
                                        </div>
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