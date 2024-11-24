import Image from "next/legacy/image";
import Link from "next/link";
import moment from 'moment';

const PredstavaRecenzija = ({ data }) => {
    return (
        <div className="media post-block m-b-xs-30 bg-grey-light-three predstava-recenzija-wrapper">
            <a href={`${data.kategorija?.kategorija_slug}/${data.slug}`} className="align-self-center">
                <Image
                    src={data.tekst_photo}
                    alt={data.naslov}
                    width={285}
                    height={285}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                />
            </a>
            <div className="media-body">
                <div className="post-cat-group m-b-xs-10">
                    <a
                        href={`${data.kategorija?.kategorija_slug}`}
                        className={`post-cat cat-btn ${data.kategorija?.naziv_kategorije}-tag-bg-color`}
                        style={{ backgroundColor: data.kategorija.kategorija_boja }}
                    >
                        {data.kategorija?.naziv_kategorije}
                    </a>
                </div>
                <h3 className="axil-post-title hover-line hover-line">
                    <Link href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}>
                        {data.naslov}
                    </Link>
                </h3>
                <p className="mid" dangerouslySetInnerHTML={{ __html: data.sadrzaj?.slice(0, 250) + "..." }}></p>

                <div className="post-metas">
                    <ul className="list-inline">
                        <li>
                            <span><i className="fa-regular fa-clock"></i></span>
                            <a href={`/author/${data.slug}`} className="post-author">
                                {moment(data.created_at).fromNow()}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PredstavaRecenzija;