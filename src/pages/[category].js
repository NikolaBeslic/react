import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../utils/axios";
import HeadMeta from "../components/elements/HeadMeta";
import HeaderOne from "../components/header/HeaderOne";
import { Breadcrumb, Spinner } from "react-bootstrap";
import PostLayoutTwo from "../components/post/layout/PostLayoutTwo";
import WidgetAd from "../components/widget/WidgetAd";
import WidgetSocialShare from "../components/widget/WidgetSocialShare";
import FooterOne from "../components/footer/FooterOne";
import { useStateContext } from "../contexts/StateContext";
import WidgetPost from "../components/widget/WidgetPost";
import WidgetPremijere from "../components/widget/WidgetPremijere";

export default function Page() {
    const router = useRouter();
    const kategorija_slug = router.query.category;

    const [category, setCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [categoryPosts, setCategoryPosts] = useState([]);
    const elementRef = useRef(null);
    const { isLoading, showLoading, hideLoading } = useStateContext();
    const [sidePosts, setSidePosts] = useState([]);
    const [premijere, setPremijere] = useState([]);

    useEffect(() => {
        fetchSidePosts();
        fetchPremijere();
        if (router.isReady) {
            if (kategorija_slug != category.kategorija_slug) {
                setCategoryPosts([]);
                fetchCategoryPosts(kategorija_slug, 1);
            } else {
                fetchCategoryPosts(kategorija_slug, currentPage);
            }
        }
    }, [kategorija_slug, currentPage]);

    const fetchCategoryPosts = async (kategorija_slug, page) => {
        showLoading();
        axiosClient
            .get(`/get-category-posts/${kategorija_slug}?page=${page}`)
            .then((res) => {
                console.log(res.data);
                setCategory(res.data);

                setCategoryPosts((prevCategoryPosts) => [
                    ...prevCategoryPosts,
                    ...res.data.tekstovi.data,
                ]);
                setTotalPages(res.data.tekstovi?.last_page);
                hideLoading();
            })
            .catch((error) => console.error(error));
    };

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
            <HeadMeta metaTitle={category.display_naziv_kategorije} />
            <Breadcrumb aPage={category.display_naziv_kategorije} />
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    {category.display_naziv_kategorije}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End here  */}
            <div className="random-posts section-gap">
                <div className="container">
                    {isLoading && (
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
                                    {categoryPosts.map((data) => (
                                        <PostLayoutTwo
                                            data={data}
                                            postSizeMd={true}
                                            key={data.slug}
                                        />
                                    ))}
                                    {!isLoading && (
                                        <button
                                            className="btn btn-primary btn-small"
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
                                        >
                                            Ucitaj jos
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="post-sidebar">
                                    <WidgetAd />
                                    <WidgetPost posts={sidePosts} />
                                    <WidgetSocialShare />
                                    {/* <WidgetCategory cateData={allPosts} /> */}
                                    <WidgetPremijere premijere={premijere} />
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
