import Image from "next/legacy/image";
import moment from "moment";
import Link from "next/link";

const PostVideoTwo = ({ data, pClass, videoIcon }) => {
    return (
        <div
            className={`media post-block post-block__small m-b-xs-40 ${
                pClass ?? "post-block__on-dark-bg"
            }`}
        >
            <Link
                href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                title={data.naslov}
            >
                <Image
                    src={data.tekst_photo}
                    alt={data.slug}
                    width={110}
                    height={110}
                    objectFit="cover"
                    quality={90}
                />
                {videoIcon === true ? (
                    <span className="video-play-btn video-play-btn__small" />
                ) : (
                    ""
                )}
            </Link>

            <div className="media-body">
                <div className="post-cat-group">
                    <a
                        href={`/${data.kategorija?.kategorija_slug}`}
                        className={`post-cat cat-btn ${data.kategorija?.naziv_kategorije}-tag-bg-color`}
                        style={{
                            backgroundColor: data.kategorija.kategorija_boja,
                        }}
                    >
                        {data.kategorija.naziv_kategorije}
                    </a>
                </div>
                <h3 className="axil-post-title hover-line hover-line">
                    <Link
                        href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                        title={data.naslov}
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
    );
};

export default PostVideoTwo;
