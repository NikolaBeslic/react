import Image from "next/legacy/image";
import moment from "moment";
import Link from "next/link";

const PovezaniTekstLayout = ({ data }) => {
    return (
        <div className="povezani-tekst-index-wrapper media post-block post-block__small m-b-xs-40 bg-grey-light-three">
            <div className="povezani-tekst-image">
                <Link
                    href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                    title={data.naslov}
                >
                    <Image
                        src={data.tekst_photo}
                        alt={data.slug}
                        width={150}
                        height={150}
                        objectFit="cover"
                        quality={90}
                    />
                </Link>
            </div>
            <div className="povezani-tekst-title-metas">
                <div className="media-body">
                    <div className="post-cat-group">
                        <span
                            className={`post-cat cat-btn ${data.kategorija?.naziv_kategorije}-tag-bg-color`}
                            style={{
                                backgroundColor:
                                    data.kategorija.kategorija_boja,
                            }}
                        >
                            {data.kategorija.naziv_kategorije}
                        </span>
                    </div>
                    <h3 className="axil-post-title hover-line hover-line">
                        <Link
                            href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                            title={data.naslov}
                            aria-label={data.naslov}
                        >
                            {data.naslov}
                        </Link>
                    </h3>
                    <div className="post-metas">
                        <ul className="list-inline">
                            <li>{moment(data.created_at).fromNow()}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PovezaniTekstLayout;
