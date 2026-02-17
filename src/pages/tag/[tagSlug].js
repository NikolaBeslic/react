import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../utils/axios";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import WidgetPremijere from "../../components/widget/WidgetPremijere";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import { Breadcrumb, Spinner } from "react-bootstrap";
import HeadMeta from "../../components/elements/HeadMeta";

export default function Page() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const elementRef = useRef(null);
    const tag_slug = router.query.tagSlug;
    const [tag, setTag] = useState([]);

    useEffect(() => {
        setLoading(treu);
        if (tag_slug) {
            axiosClient
                .get(`/get-texts-by-tag/${tag_slug}`)
                .then((res) => {
                    console.log(res.data);
                    setTag(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [tag_slug]);

    return (
        <>
            <HeadMeta metaTitle={tag.tag_naziv} />
            <Breadcrumb aPage={tag.tag_naziv} bCat="Tagovi" />
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    Tag: {tag.tag_naziv}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End here  */}
            <div className="random-posts section-gap">
                <div className="container">
                    {loading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="hup-spinner"
                        />
                    )}
                    <>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="axil-content" ref={elementRef}>
                                    {tag.tekstovi?.map((data) => (
                                        <PostLayoutTwo
                                            data={data}
                                            postSizeMd={true}
                                            key={data.slug}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="post-sidebar">
                                    <WidgetAd />
                                    {/* <WidgetPost posts={sidePosts} /> */}
                                    <WidgetSocialShare />
                                    {/* <WidgetCategory cateData={allPosts} /> */}
                                    {/* <WidgetPremijere premijere={premijere} /> */}
                                    <WidgetAd
                                        img="/images/clientbanner/clientbanner3.jpg"
                                        height={492}
                                        width={320}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    );
}
