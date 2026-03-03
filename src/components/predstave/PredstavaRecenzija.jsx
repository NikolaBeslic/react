import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";

const PredstavaRecenzija = ({ data }) => {
    return (
        <div className="media post-block">
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

                <Link
                    href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                >
                    <h3 className="axil-post-title hover-line hover-line">
                        {data.naslov}
                    </h3>
                </Link>

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
                            <span>
                                <i className="fa-regular fa-clock"></i>
                            </span>
                            <Link
                                href={`/author/${data.slug}`}
                                className="post-author"
                            >
                                {moment(data.created_at).fromNow()}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PredstavaRecenzija;
