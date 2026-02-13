import Image from "next/image";
import Breadcrumb from "../../../../common/Breadcrumb";
import HeadMeta from "../../../../elements/HeadMeta";

const AutorHeader = ({ autor }) => {
    return (
        <>
            <HeadMeta metaTitle={autor.ime_autora} />
            <Breadcrumb bCat="Redakcija" aPage={autor.ime_autora} />
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
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: autor.biografija,
                                                }}
                                            ></div>
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
                                                        {autor.tekstovi?.total})
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
        </>
    );
};

export default AutorHeader;
