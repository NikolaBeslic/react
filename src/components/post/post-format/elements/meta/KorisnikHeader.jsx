import moment from "moment";
import Breadcrumb from "../../../../common/Breadcrumb";
import HeadMeta from "../../../../elements/HeadMeta";

const KorisnikHeader = ({ korisnik }) => {
    return (
        <>
            <HeadMeta metaTitle="Korisnicki profil" />
            <Breadcrumb aPage="Korisnicki profil" />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12"></div>
                        <div className="post-title-wrapper">
                            <h1 className="m-b-xs-0 axil-post-title hover-line">
                                {korisnik.korisnicko_ime}
                            </h1>
                            <div className="post-metas banner-post-metas m-t-xs-20">
                                <ul className="list-inline">
                                    <li>
                                        <i className="fa-regular fa-location-dot"></i>
                                        Grad
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-at"></i>
                                        {korisnik.email}
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-calendar-day"></i>
                                        Na hocupozoriste od:{" "}
                                        {moment(korisnik.created_at).format(
                                            "DD.MMM.yyyy",
                                        )}
                                    </li>
                                </ul>
                                <ul className="list-inline">
                                    <li>
                                        <i className="fa-regular fa-square-check"></i>
                                        Odgledanih predstava:{" "}
                                        <strong>
                                            {korisnik.lista_odgledanih?.length}
                                        </strong>
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-comments"></i>
                                        Komentara:{" "}
                                        <strong>
                                            {korisnik.komentari?.length}
                                        </strong>
                                    </li>

                                    <li>
                                        <i className="fa-solid fa-list-check"></i>
                                        Na listi želja:{" "}
                                        <strong>
                                            {korisnik.lista_zelja?.length}
                                        </strong>
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-heart"></i>{" "}
                                        Omiljena pozorista:{" "}
                                        <strong>
                                            {
                                                korisnik.omiljena_pozorista
                                                    ?.length
                                            }
                                        </strong>
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-star"></i>
                                        Prosecna ocena:
                                        <strong>7.9</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default KorisnikHeader;
