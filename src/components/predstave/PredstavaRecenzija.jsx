import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const PredstavaRecenzija = ({ data }) => {
    return (
        <div className="category-index-post media post-block post-block__mid">
            <Link
                href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                className="align-self-center"
            >
                <Image
                    src={data.tekst_photo}
                    alt={data.naslov}
                    width={285}
                    height={285}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                />
            </Link>
            <div className="media-body">
                <div className="post-cat-group m-b-xs-10">
                    <Link
                        href={`/${data.kategorija?.kategorija_slug}`}
                        className={`post-cat cat-btn ${data.kategorija?.naziv_kategorije}-tag-bg-color`}
                        style={{
                            backgroundColor: data.kategorija.kategorija_boja,
                        }}
                    >
                        {data.kategorija?.naziv_kategorije}
                    </Link>
                </div>

                <h3 className="axil-post-title hover-line hover-line">
                    <Link
                        href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                    >
                        {data.naslov}
                    </Link>
                </h3>

                <div
                    className="mid"
                    dangerouslySetInnerHTML={{
                        __html: data.sadrzaj?.slice(0, 400) + "...",
                    }}
                ></div>

                <div className="post-metas">
                    <ul className="list-inline">
                        {data.autori?.map((autorData) => (
                            <li key={autorData.autor_slug}>
                                <Link
                                    className="post-author post-author-with-img"
                                    href={`/autori/${autorData.autor_slug}`}
                                >
                                    <Image
                                        src={autorData.url_slike}
                                        alt={autorData.autor_slug}
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
                            <FontAwesomeIcon icon={faClock} />
                            {moment(data.created_at).fromNow()}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PredstavaRecenzija;
