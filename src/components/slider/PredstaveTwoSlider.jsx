import React, { Component } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { Card } from "react-bootstrap";
import moment from "moment";

function PredstaveTwoSlider({ predstaveData }) {

    return (

        <div className="container">

            <Swiper
                spaceBetween={10}
                slidesPerView={'auto'}
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
                        <SwiperSlide key={data.predstavaid}>
                            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
                            <Card className="predstave-naslovna-card" >
                                <a href={`/predstave/${data.predstava_slug}`} title={data.naziv_predstave}>
                                    <Card.Img className="predstave-naslovna-card-img" variant="cover" src={data.plakat} />
                                </a>
                                <Card.Body className="predstave-naslovna-card-body">
                                    <Card.Title className="predstave-naslovna-card-title">
                                        <h5>
                                            <a href={`/predstave/${data.predstava_slug}`} title={data.naziv_predstave}>{data.naziv_predstave}</a>
                                        </h5>
                                    </Card.Title>
                                    <Card.Text className="predstave-naslovna-card-text">
                                        <i className="fa-solid fa-building-columns"></i> {data.pozorista.map((poz) => (<span key={poz.pozoristeid}>{poz.naziv_pozorista}</span>))} <br />
                                        {data.prosecna_ocena
                                            ?
                                            <><i className="fa-solid fa-star"></i> {data.prosecna_ocena}</>
                                            :
                                            <><i className="fa-solid fa-calendar-days"></i> Premijera: {moment(data.premijera).format("Do MMM YYYY.")}</>
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </SwiperSlide >

                    </>
                ))}
            </Swiper>
        </div >

    );
}

export default PredstaveTwoSlider;