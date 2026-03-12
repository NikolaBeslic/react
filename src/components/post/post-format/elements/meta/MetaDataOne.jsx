import Image from "next/legacy/image";
import moment from "moment";
import { Badge, Stack } from "react-bootstrap";
import Breadcrumb from "../../../../common/Breadcrumb";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const MetaDataOne = ({ metaData }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    return (
        <>
            {isTabletOrMobile ? (
                <div className="banner banner__single-post banner__standard">
                    <div className="post-main-thumbnail">
                        <Image
                            src={metaData.tekst_photo}
                            alt={metaData.naslov}
                            width={540}
                            height={540}
                            className="img-fluid"
                        />
                    </div>
                    <div className="container">
                        <div className="post-cat-group m-b-xs-10">
                            <Link
                                href={`/${metaData.kategorija?.kategorija_slug}`}
                                className={`post-cat cat-btn ${metaData.kategorija?.naziv_kategorije}-tag-bg-color`}
                                style={{
                                    backgroundColor:
                                        metaData.kategorija.kategorija_boja,
                                }}
                            >
                                {metaData.kategorija?.naziv_kategorije}
                            </Link>
                        </div>
                        <div className="post-title-wrapper">
                            <h1 className="m-t-xs-20 m-b-xs-20 axil-post-title hover-line">
                                {metaData.naslov}
                            </h1>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="post-metas banner-post-metas m-t-xs-20">
                                    <ul className="list-unstyled">
                                        {metaData.autori?.map((autorData) => (
                                            <li key={autorData.autor_slug}>
                                                <Link
                                                    className="post-author post-author-with-img"
                                                    href={`/autori/${autorData.autor_slug}`}
                                                >
                                                    <Image
                                                        src={
                                                            autorData.url_slike
                                                        }
                                                        alt={
                                                            autorData.autor_slug
                                                        }
                                                        width={30}
                                                        height={30}
                                                    />
                                                    <span className="author-name">
                                                        {autorData.ime_autora}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <i className="fa-regular fa-calendar-lines-pen"></i>
                                            {moment(
                                                metaData.published_at,
                                            ).format("DD. MMM YYYY.")}
                                        </li>
                                    </ul>
                                </div>

                                {/* End of .post-metas */}

                                {/* End of .post-title-wrapper */}
                            </div>
                            {/* End of .col-lg-6 */}
                        </div>
                        {/* End of .row */}
                    </div>
                    {/* End of .container */}
                    {/* End of mobile */}
                </div>
            ) : (
                // Desktop start
                <>
                    <Breadcrumb
                        bCat={metaData.kategorija?.kategorija_slug}
                        aPage={metaData.naslov}
                    />
                    <div className="banner banner__single-post banner__standard">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    {/*{" "}
                                <div className="btn-group">
                                    <Link
                                        href={`/${metaData.kategorija?.kategorija_slug}`}
                                        className={`cat-btn ${metaData?.cate_bg ?? "bg-color-blue-one"}`}
                                        legacyBehavior
                                    >
                                        {metaData.kategorija
                                            ?.naziv_kategorije || "Test"}
                                    </Link>
                                </div>{" "}
                                */}
                                    <div className="post-metas banner-post-metas m-t-xs-20">
                                        <ul className="list-inline">
                                            {metaData.autori?.map(
                                                (autorData) => (
                                                    <li
                                                        key={
                                                            autorData.autor_slug
                                                        }
                                                    >
                                                        <Link
                                                            className="post-author post-author-with-img"
                                                            href={`/autori/${autorData.autor_slug}`}
                                                        >
                                                            <Image
                                                                src={
                                                                    autorData.url_slike
                                                                }
                                                                alt={
                                                                    autorData.autor_slug
                                                                }
                                                                width={30}
                                                                height={30}
                                                            />
                                                            <span className="author-name">
                                                                {
                                                                    autorData.ime_autora
                                                                }
                                                            </span>
                                                        </Link>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                    <div className="post-title-wrapper">
                                        <h1 className="m-t-xs-20 m-b-xs-0 axil-post-title hover-line">
                                            {metaData.naslov}
                                        </h1>
                                        <div className="post-metas banner-post-metas m-t-xs-20 m-b-xs-20">
                                            <ul className="list-inline">
                                                <li>
                                                    <i className="fa-regular fa-calendar-lines-pen"></i>
                                                    {moment(
                                                        metaData.created_at,
                                                    ).format("DD. MMM YYYY.")}
                                                </li>
                                            </ul>
                                        </div>
                                        {/* End of .post-metas */}
                                    </div>
                                    {/* End of .post-title-wrapper */}
                                </div>
                                {/* End of .col-lg-6 */}
                                <div className="col-lg-6">
                                    <div className="post-main-thumbnail">
                                        <Image
                                            src={metaData.tekst_photo}
                                            alt={metaData.naslov}
                                            width={540}
                                            height={540}
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* End of .row */}
                        </div>
                        {/* End of .container */}
                    </div>
                </>
            )}
        </>
    );
};

export default MetaDataOne;
