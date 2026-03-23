import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import moment from "moment";

const RepertoariSlider = ({ izvodjenja }) => {
    const pClass = "";
    return (
        <>
            <div className="nav">
                <button className="swiper-prev nav-btn">
                    <FontAwesomeIcon icon={faChevronUp} />
                </button>
            </div>

            <Swiper
                modules={[Autoplay, Navigation]}
                direction={"vertical"}
                autoHeight={false}
                className="swiper-danas-repertoaru"
                slidesPerView={3}
                spaceBetween={15}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={{
                    nextEl: ".swiper-next",
                    prevEl: ".swiper-prev",
                }}
                allowTouchMove={true}
            >
                {izvodjenja.map((izv) => (
                    <SwiperSlide key={`side-${izv.seigraid}`}>
                        <div
                            className={`media post-block post-block__small repertoar-naslovna-wrapper ${
                                pClass ?? "post-block__on-dark-bg m-b-xs-30"
                            }`}
                        >
                            <div className="media-body repertoar-naslovna-info">
                                <div className="post-cat-group repertoar-naslovna-vreme">
                                    <FontAwesomeIcon icon={faClock} />{" "}
                                    {moment(`2020-01-01 ${izv.vreme}`).format(
                                        "HH:mm",
                                    )}
                                </div>
                                <h6 className="hover-line hover-line predstava-index-title">
                                    <Link
                                        href={`/predstave/${izv.predstava.predstava_slug}`}
                                        title={izv.predstava.naziv_predstave}
                                        aria-label={
                                            izv.predstava.naziv_predstave
                                        }
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
                </button>
            </div>
            <div className="repertoar-naslovna-show-all">
                <Link
                    href="/repertoari"
                    className="btn btn-small btn-primary btn-nofill "
                >
                    Pogledaj sve
                </Link>
            </div>
        </>
    );
};

export default RepertoariSlider;
