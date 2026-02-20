import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Card } from "react-bootstrap";
import moment from "moment";
import Link from "next/link";

function PredstaveTwoSlider({ predstaveData }) {
    return (
        <div className="container">
            <Swiper
                spaceBetween={28}
                slidesPerView={"auto"}
                slidesPerGroupAuto={true}
                grabCursor={true}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
                loop={true}
                pagination={{
                    clickable: true,
                }}
            >
                {predstaveData?.map((data) => (
                    <>
                        <SwiperSlide key={`ss-${data.predstavaid}`}>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Link
                                href={`/predstave/${data.predstava_slug}`}
                                title={data.naziv_predstave}
                                key={`lnk-${data.predstavaid}`}
                            >
                                <Card
                                    key={`card-${data.predstavaid}`}
                                    className="predstave-naslovna-card"
                                >
                                    <Card.Img
                                        className="predstave-naslovna-card-img"
                                        variant="cover"
                                        src={
                                            data.plakat ||
                                            "/slike/vizitke-cover.jpg"
                                        }
                                        alt={data.naziv_predstave}
                                        key={`cimg-${data.predstavaid}`}
                                    />

                                    <Card.Body
                                        key={`cb-${data.predstavaid}`}
                                        className="predstave-naslovna-card-body"
                                    >
                                        <Card.Title
                                            key={`ct-${data.predstavaid}`}
                                            className="predstave-naslovna-card-title"
                                        >
                                            <h5>{data.naziv_predstave}</h5>
                                        </Card.Title>
                                        <Card.Text
                                            key={`ctxt-${data.predstavaid}`}
                                            className="predstave-naslovna-card-text"
                                        >
                                            <i className="fa-solid fa-building-columns"></i>{" "}
                                            {data.pozorista.map((poz) => (
                                                <span key={poz.pozoristeid}>
                                                    {poz.naziv_pozorista}
                                                </span>
                                            ))}{" "}
                                            <br />
                                            {data.prosecna_ocena ? (
                                                <>
                                                    <i className="fa-solid fa-star"></i>{" "}
                                                    {data.prosecna_ocena}
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-calendar-days"></i>{" "}
                                                    Premijera:{" "}
                                                    {moment(
                                                        data.premijera,
                                                    ).format("Do MMM YYYY.")}
                                                </>
                                            )}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
        </div>
    );
}

export default PredstaveTwoSlider;
