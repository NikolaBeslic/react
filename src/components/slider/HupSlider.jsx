import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const HuPSlider = ({ slidePost }) => {
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
        autoplaySpeed: 5000,
        speed: 600,
        cssEase: "ease-in-out",
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: true,
    };

    const slideSettingsImage = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplaySpeed: 5000,
        speed: 600,
        cssEase: "ease-in-out",
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: true,
        nextArrow: <SlickNextArrow />,
        prevArrow: <SlickPrevArrow />,
    };

    const slider1 = useRef(null);
    const slider2 = useRef(null);

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);

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
                                    ref={slider1}
                                    asNavFor={nav2}
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
                                                                    <li
                                                                        className="m-r-xs-20"
                                                                        key={
                                                                            autor.autor_slug
                                                                        }
                                                                    >
                                                                        <Link
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
                                                                                key={
                                                                                    autor.autorid
                                                                                }
                                                                            />
                                                                            <span className="m-l-xs-20">
                                                                                {
                                                                                    autor.ime_autora
                                                                                }
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                ),
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
                                                        PROČITAJ VIŠE
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
                            ref={slider2}
                            asNavFor={nav1}
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
                    </div>
                </>
            </div>
        </div>
    );
};

export default HuPSlider;
