import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import MetaDataOne from "./elements/meta/MetaDataOne";
import PostAuthor from "./elements/PostAuthor";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";


const HuPTekstNoSideBar = ({ postData, sidePosts }) => {
    console.log("RP" + sidePosts);
    return (
        <>
            <MetaDataOne metaData={postData} />
            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <main className="site-main">
                                <article className="post-details">
                                    <div className="single-blog-wrapper">
                                        {/* <SocialShareSide /> */}
                                        <div dangerouslySetInnerHTML={{ __html: postData.sadrzaj }}></div>
                                    </div>
                                </article>
                                {/* <SocialShareBottom /> */}
                                <hr className="m-t-xs-50 m-b-xs-60" />
                                <PostAuthor authorData={postData} />
                                {/* <PostComment /> */}
                            </main>
                        </div>
                        <div className="col-lg-12">
                            <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetNewsletter />
                                <WidgetSocialShare />
                                <WidgetPost posts={sidePosts} />
                                <WidgetInstagram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HuPTekstNoSideBar;