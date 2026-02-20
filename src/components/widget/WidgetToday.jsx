import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/legacy/image";
import moment from "moment";

const WidgetToday = ({ izvodjenja }) => {
    const pClass = "";
    return (
        <div className="category-widget m-b-xs-40 repertoar-naslovna-widget-wrapper">
            <div className="widget-title">
                <h3>Danas na repertoaru</h3>
            </div>
            <div className="widget-body">
                <div className="nav">
                    <button className="swiper-prev nav-btn">
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                </div>
                <Swiper
                    modules={[Autoplay, Navigation]}
                    direction={"vertical"}
                    className="swiper-danas-repertoaru"
                    slidesPerView={3}
                    spaceBetween={15}
                    loop={false}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    navigation={{
                        nextEl: ".swiper-next",
                        prevEl: ".swiper-prev",
                    }}
                >
                    {izvodjenja.map((izv) => (
                        <SwiperSlide key={`side-${izv.seigraid}`}>
                            <div
                                className={`media post-block post-block__small repertoar-naslovna-wrapper ${
                                    pClass ?? "post-block__on-dark-bg m-b-xs-30"
                                }`}
                            >
                                {/* <div className="repertoar-naslovna-photo">
                                    <Link
                                        href={`/predstave/${izv.predstava.predstava_slug}`}
                                        className="align-self-center"
                                    >
                                        <Image
                                            src={
                                                izv.predstava.plakat ??
                                                "/slike/hup-logo.jpg"
                                            }
                                            alt={izv.predstava.naziv_predstave}
                                            height={90}
                                            width={60}
                                            objectFit="cover"
                                            quality={90}
                                        />
                                    </Link>
                                </div> */}

                                <div className="media-body repertoar-naslovna-info">
                                    <div className="post-cat-group repertoar-naslovna-vreme">
                                        <FontAwesomeIcon icon={faClock} />{" "}
                                        {moment(
                                            `2020-01-01 ${izv.vreme}`,
                                        ).format("HH:mm")}
                                    </div>
                                    <h6 className="hover-line hover-line predstava-index-title">
                                        <Link
                                            href={`/predstave/${izv.predstava.predstava_slug}`}
                                        >
                                            {izv.predstava.naziv_predstave}
                                        </Link>
                                    </h6>
                                    <div className="post-metas">
                                        <span className="text-muted">
                                            {izv.pozoriste.naziv_pozorista}{" "}
                                            {izv.scena &&
                                                `| ${izv.scena.naziv_scene}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="nav">
                    <button className="swiper-next nav-btn">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>{" "}
                </div>
                <div className="repertoar-naslovna-show-all">
                    <Link
                        href="/repertoari-v2"
                        className="btn btn-small btn-primary btn-nofill "
                    >
                        Pogledaj sve
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WidgetToday;
