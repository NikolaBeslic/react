import Image from "next/image";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/StateContext";
import { Spinner } from "react-bootstrap";

const PostAuthor = () => {
    const router = useRouter();
    const { autorSlug } = router.query;
    const [autor, setAutor] = useState([]);
    const [autorPosts, setAutorPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { isLoading, showLoading, hideLoading } = useStateContext();

    useEffect(() => {
        if (autorSlug != autor.autor_slug) {
            fetchSingleAutor(autorSlug, 1);
        } else {
            fetchSingleAutor(autorSlug, currentPage);
        }
    }, [autorSlug, currentPage]);

    const fetchSingleAutor = async (autorSlug, page) => {
        showLoading();
        axiosClient
            .get(`/get-single-autor/${router.query.autorSlug}?page=${page}`)
            .then((res) => {
                console.log(res.data);
                setAutor(res.data);
                setAutorPosts((prevAutorPosts) => [
                    ...prevAutorPosts,
                    ...res.data.tekstovi,
                ]);
                hideLoading();
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <HeadMeta metaTitle={autor.ime_autora} />
            <Breadcrumb aPage={autor.ime_autora} />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="author-details-block">
                                <div className="media post-block post-block__mid m-b-xs-0">
                                    <a href="#" className="align-self-center">
                                        <Image
                                            src={autor.url_slike}
                                            alt={autor.ime_autora}
                                            width={210}
                                            height={210}
                                            className="m-r-xs-30"
                                            objectFit="cover"
                                        />
                                        <div className="grad-overlay__transparent overlay-over" />
                                    </a>
                                    <div className="media-body">
                                        <h2 className="h4 m-b-xs-15">
                                            {autor.ime_autora}
                                        </h2>
                                        <p className="hover-line autor-pozicija">
                                            <i className="fa-regular fa-circle-user"></i>{" "}
                                            {autor.pozicija}
                                        </p>
                                        <div className="mid">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: autor.biografija,
                                                }}
                                            ></p>
                                        </div>
                                        <div className="post-metas">
                                            <ul className="list-inline">
                                                <li>
                                                    <i className="fa-light fa-location-dot"></i>
                                                    {autor.grad?.naziv_grada}
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fal fa-user-edit" />
                                                        Ukupno tekstova (
                                                        {autor.tekstovi?.length}
                                                        )
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="author-social-share">
                                            <ul className="social-share social-share__with-bg">
                                                ovde su bile ikonice za
                                                drustvene mreze
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {isLoading && (
                                <Spinner
                                    animation="border"
                                    role="status"
                                    className="hup-spinner"
                                />
                            )}
                            <div className="axil-content">
                                <h2 className="h3 m-b-xs-40">
                                    Teksovi autorke
                                </h2>
                                {autorPosts.map((data) => (
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
                                <WidgetSocialShare />
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
};

export default PostAuthor;
