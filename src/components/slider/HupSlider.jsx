import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";

const HuPSlider = ({ slidePost }) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
    const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

    function SlickNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button className={className} onClick={onClick}>
                <i className="feather icon-chevron-right"></i>
            </button>
        );
    }

    function SlickPrevArrow(props) {
        const { className, onClick } = props;
        return (
            <button className={className} onClick={onClick}>
                <i className="feather icon-chevron-left"></i>
            </button>
        );
    }

    const slideSettingsContent = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear",
    };

    const slideSettingsImage = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplaySpeed: 4000,
        cssEase: "linear",
        nextArrow: <SlickNextArrow />,
        prevArrow: <SlickPrevArrow />,
    };

    const slideSettingsShare = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        vertical: true,
    };

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const [nav3, setNav3] = useState();

    // Social Share Toggle
    const ShareToggler = (e) => {
        const targeElm = e.target.nextElementSibling;
        targeElm.classList.toggle("show-shares");
    };

    return (
        <div className="banner banner__home-with-slider banner__home-with-slider-one section-gap-bottom">
            <div className="banner__home-with-slider-overlay"></div>
            {/* End of .banner__home-with-slider-overlay */}
            <div className="container">
                <>
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="banner-slider-container">
                                <Slider
                                    asNavFor={nav2}
                                    ref={(slider1) => setNav1(slider1)}
                                    initialSlide={2}
                                    {...slideSettingsContent}
                                    className="slick-slider-for slick-synced"
                                >
                                    {slidePost
                                        .filter((item) => item.na_slajderu == 1)
                                        .slice(0, 3)
                                        .map((data) => (
                                            <div
                                                className="item"
                                                key={data.slug}
                                            >
                                                <div className="post-metas home-banner-post-metas m-b-xs-20">
                                                    <ul className="list-inline">
                                                        {data.autori.length >
                                                            0 &&
                                                            data.autori.map(
                                                                (autor) => (
                                                                    <li className="m-r-xs-20">
                                                                        <a
                                                                            href={`/autori/${autor.autor_slug}`}
                                                                            className="d-flex align-items-center"
                                                                        >
                                                                            <Image
                                                                                src={
                                                                                    autor.url_slike
                                                                                }
                                                                                alt={
                                                                                    autor.autor_slug
                                                                                }
                                                                                width={
                                                                                    50
                                                                                }
                                                                                height={
                                                                                    50
                                                                                }
                                                                            />
                                                                            <span className="m-l-xs-20">
                                                                                {
                                                                                    autor.ime_autora
                                                                                }
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </div>
                                                {/* End of .post-metas */}
                                                <h1 className="page-title m-b-xs-40 hover-line">
                                                    <Link
                                                        href={`${data.kategorija.kategorija_slug}/${data.slug}`}
                                                        legacyBehavior
                                                    >
                                                        {data.naslov}
                                                    </Link>
                                                </h1>
                                                <div className="btn-group">
                                                    <Link
                                                        href={`${data.kategorija.kategorija_slug}/${data.slug}`}
                                                        className="btn btn-primary m-r-xs-30"
                                                    >
                                                        READ MORE
                                                    </Link>
                                                    <Link
                                                        href={`/${data.kategorija.kategorija_slug}`}
                                                        className="btn-link"
                                                    >
                                                        {
                                                            data.kategorija
                                                                .naziv_kategorije
                                                        }
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                    <div className="banner-slider-container-synced">
                        <Slider
                            asNavFor={nav3}
                            ref={(slider2) => setNav2(slider2)}
                            {...slideSettingsImage}
                            className="slick-slider-nav slick-synced"
                        >
                            {slidePost
                                .filter((item) => item.na_slajderu == 1)
                                .slice(0, 3)
                                .map((data) => (
                                    <div className="item" key={data.slug}>
                                        <Image
                                            src={data.tekst_photo}
                                            alt={data.slug}
                                            width={960}
                                            height={600}
                                        />
                                    </div>
                                ))}
                        </Slider>
                        <div className="banner-share-slider-container">
                            <Slider
                                asNavFor={nav1}
                                ref={(slider3) => setNav3(slider3)}
                                {...slideSettingsShare}
                                className="banner-share-slider"
                            >
                                {slidePost
                                    .filter((item) => item.na_slajderu == 1)
                                    .slice(0, 3)
                                    .map((data) => (
                                        <div className="item" key={data.slug}>
                                            <div className="banner-shares slick-banner-shares">
                                                <div
                                                    className="toggle-shares"
                                                    onClick={ShareToggler}
                                                >
                                                    Shares <span>+</span>
                                                </div>
                                                <div className="social-share-wrapper">
                                                    <ul className="social-share social-share__with-bg">
                                                        <li>
                                                            <a href="#">
                                                                <i className="fab fa-facebook-f" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa-brands fa-x-twitter" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fab fa-behance" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fab fa-linkedin-in" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </Slider>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export default HuPSlider;
