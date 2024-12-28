import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import PostFormatStandard from "../../components/post/post-format/PostFormatStandard";
import HeadMeta from "../../components/elements/HeadMeta";
import HeaderOne from "../../components/header/HeaderOne";
import FooterOne from "../../components/footer/FooterOne";
import axiosClient from "../../utils/axios";
import HuPTekstNoSideBar from "../../components/post/post-format/HuPTekstNoSideBar";
import { useStateContext } from "../../contexts/StateContext";
import Spinner from "react-bootstrap/Spinner";
import PostFormatHupikon from "../../components/post/post-format/PostFormatHupikon";

export default function Page() {
    const router = useRouter();

    const { postSlug } = router.query;
    const categorySlug = router.query.category;
    const [category, setCategory] = useState([]);
    const [post, setPost] = useState([]);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [sidePosts, setSidePosts] = useState([]);
    const [premijere, setPremijere] = useState([]);
    const { isLoading, showLoading, hideLoading } = useStateContext();

    useEffect(() => {
        fetchSidePosts();
        fetchPremijere();
        const fetchSingleText = async () => {
            showLoading();
            axiosClient
                .get(`/get-single-text/${router.query.postSlug}`)
                .then((res) => {
                    console.log(res.data);
                    setPost(res.data);
                    hideLoading();
                    axiosClient
                        .get(`/get-related-posts/${res.data?.tekstid}`)
                        .then((res2) => {
                            console.log("RPPP");
                            console.log(res2.data);
                            setRelatedPosts(res2.data);
                        })
                        .catch((error2) => console.error(error2));
                })
                .catch((error) => console.error(error));
        };
        if (postSlug) {
            fetchSingleText();
        }
    }, [postSlug]);

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
            <HeadMeta metaTitle={post.naslov} />
            <Breadcrumb
                bCat={post.kategorija?.kategorija_slug}
                aPage={post.naslov}
            />
            {/* Banner Start here  */}
            {/* <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{category.naziv_kategorije}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Banner End here  */}
            {isLoading && (
                <Spinner
                    animation="border"
                    role="status"
                    className="hup-spinner"
                />
            )}
            {post.kategorijaid == 5 ? (
                <PostFormatHupikon
                    postData={post}
                    relatedPosts={relatedPosts}
                    sidePosts={sidePosts}
                    premijere={premijere}
                />
            ) : (
                <PostFormatStandard
                    postData={post}
                    relatedPosts={relatedPosts}
                    sidePosts={sidePosts}
                    premijere={premijere}
                />
            )}
        </>
    );
}
