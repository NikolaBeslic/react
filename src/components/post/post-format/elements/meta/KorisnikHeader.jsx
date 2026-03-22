import moment from "moment";
import Breadcrumb from "../../../../common/Breadcrumb";
import HeadMeta from "../../../../elements/HeadMeta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faComments } from "@fortawesome/free-regular-svg-icons";
import {
    faAt,
    faCalendarDay,
    faListCheck,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

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
                            <div className="post-metas korisnik-meta banner-post-metas m-t-xs-20">
                                <ul className="korisnik-meta-list">
                                    {/* <li>
                                        <i className="fa-regular fa-location-dot"></i>
                                        Grad
                                    </li> */}
                                    <li className="korisnik-meta-item">
                                        <FontAwesomeIcon icon={faAt} />
                                        {korisnik.email}
                                    </li>
                                    <li className="korisnik-meta-item">
                                        <FontAwesomeIcon icon={faCalendarDay} />
                                        <span>Na hocupozoriste od: </span>
                                        <strong>
                                            {moment(korisnik.created_at).format(
                                                "DD. MMM yyyy.",
                                            )}
                                        </strong>
                                    </li>
                                </ul>
                                <ul className="korisnik-meta-list">
                                    <li className="korisnik-meta-item">
                                        <FontAwesomeIcon icon={faSquareCheck} />
                                        <span>Odgledanih predstava: </span>
                                        <strong>
                                            {korisnik.lista_odgledanih?.length}
                                        </strong>
                                    </li>
                                    <li className="korisnik-meta-item">
                                        <FontAwesomeIcon icon={faComments} />
                                        <span>Komentara: </span>
                                        <strong>
                                            {korisnik.komentari?.length}
                                        </strong>
                                    </li>

                                    <li className="korisnik-meta-item">
                                        <FontAwesomeIcon icon={faListCheck} />
                                        <span>Na listi želja: </span>
                                        <strong>
                                            {korisnik.lista_zelja?.length}
                                        </strong>
                                    </li>
                                    {/* <li>
                                        <i className="fa-regular fa-heart"></i>{" "}
                                        Omiljena pozorista:{" "}
                                        <strong>
                                            {
                                                korisnik.omiljena_pozorista
                                                    ?.length
                                            }
                                        </strong>
                                    </li> */}
                                    <li className="korisnik-meta-item">
                                        <FontAwesomeIcon
                                            icon={faStarHalfStroke}
                                        />
                                        <span>Prosecna ocena: </span>
                                        <strong>
                                            {korisnik.prosecna_ocena ?? 0}
                                        </strong>
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
