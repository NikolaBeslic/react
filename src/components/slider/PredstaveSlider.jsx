import Image from "next/legacy/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { slugify } from "../../utils";

const PredstaveSlider = ({ slidePost }) => {

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
    dots: true,
  };

  const slideSettingsImage = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: '0',
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

  // Shape Class Added
  const [shape, setshape] = useState('');

  useEffect(() => {
    setshape('shape-loaded');
  }, []);


  return (
    <div className="banner banner__home-with-slider banner__home-with-slider-two grad-bg">
      <div className={`axil-shape-circle ${shape}`} />
      <div className={`axil-shape-circle__two ${shape}`} />
      <div className="container">
        <div className="row">
          <div className="col-xl-5">
            <div className="banner-slider-container banner-slider-container-two">
              <Slider {...slideSettingsContent} asNavFor={nav3} ref={(slider1 => setNav1(slider1))} className="slick-slider slick-slider-for">
                {slidePost?.slice(0, 3).map((data) => (
                  <div className="item" key={data.predstavaid}>
                    <div className="post-metas home-banner-post-metas m-b-xs-20">
                      <ul className="list-inline">
                        <li className="m-r-xs-20">
                          <a
                            href={`/zanrovi`}
                            className="d-flex align-items-center"
                          >
                            <span className="m-l-xs-20">Komedija</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* End of .post-metas */}
                    <h1 className="page-title m-b-xs-40 hover-line">
                      <a href={`/predstave/${data.predstava_slug}`}>
                        {data.naziv_predstave}
                      </a>
                    </h1>
                    <div className="btn-group">
                      <a href={`/predstave/${data.predstava_slug}`} className="btn btn-primary m-r-xs-30">
                        Više informaciaja o predstavi
                      </a>
                      <a href={`/category/${data.predstava_slug}`} className="btn-a">
                        Sve komedije
                      </a>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="banner-slider-container-synced banner-slider-container-synced__two">
          <Slider {...slideSettingsImage} asNavFor={nav1} ref={(slider2 => setNav2(slider2))} className="slick-slider slick-slider-nav">
            {slidePost?.slice(0, 3).map((data) => (
              <div className="item" key={data.predstavaid}>
                <Image
                  src={data.plakat}
                  alt={data.predstava_slug}
                  width={495}
                  height={550}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="banner-share-slider-container banner-share-slider-container__two">
          <Slider {...slideSettingsShare} asNavFor={nav2} ref={(slider3 => setNav3(slider3))} className="slick-slider banner-share-slider">
            {slidePost?.slice(0, 3).map((data) => (
              <div className="item" key={data.predstavaid}>
                <div className="banner-shares slick-banner-shares">
                  <div className="toggle-shares" onClick={ShareToggler}>
                    Shares <span>+</span>
                  </div>
                  <div className="social-share-wrapper">
                    <ul className="social-share social-share__with-bg">
                      <li>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=https://new.axilthemes.com/post/${data.predstava_slug}`}>
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
                  {/* End of .social-share-wrapper */}
                </div>
                {/* End of .banner-shares */}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PredstaveSlider;
