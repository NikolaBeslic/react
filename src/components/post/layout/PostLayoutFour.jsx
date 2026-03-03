// import Image from "next/image";
import Image from "next/legacy/image";
import moment from "moment";
import Link from "next/link";

const PostLayoutFour = ({ data }) => {
    return (
        <div className="content-block m-b-xs-30">
            <Link href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}>
                <Image
                    src={data.tekst_photo}
                    alt={data.naslov}
                    height={255}
                    width={255}
                    className="img-fluid"
                    objectFit="cover"
                    layout="responsive"
                />
                <div className="grad-overlay" />
            </Link>
            <div className="media-caption">
                <div className="caption-content">
                    <h3 className="axil-post-title hover-line hover-line intervju-naslovna-title">
                        <Link
                            href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                            title={data.naslov}
                        >
                            {data.naslov}
                        </Link>
                    </h3>
                </div>
                {/* End of .content-inner */}
            </div>
        </div>
    );
};

export default PostLayoutFour;
