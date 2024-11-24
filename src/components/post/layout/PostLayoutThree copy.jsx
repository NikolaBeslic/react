import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../utils";

const PostLayoutThree = ({ data, postSizeLg, pClass, videoPost }) => {
    return (
        <div className={`axil-img-container ${pClass ?? "m-b-xs-30"}`}>
            <a
                href={`/post/${data.slug}`}
                className={`d-block ${videoPost === true ? "h-100" : ""}`}
                legacyBehavior>

                <Image
                    src={data.tekst_photo}
                    alt={data.naslov}
                    width={postSizeLg === true ? 730 : 350}
                    height={postSizeLg === true ? 550 : 260}
                    className="w-100"
                />
                <div className={`grad-overlay ${videoPost === true ? "grad-overlay__transparent" : ""}`} />

            </a>
            <div className="media post-block position-absolute">
                <div className={`media-body ${postSizeLg === true ? "media-body__big" : ""}`}>
                    <div className="post-cat-group m-b-xs-10">
                        <Link
                            href={`/category/${slugify(data.kategorija?.kategorija_slug)}`}
                            className={`post-cat cat-btn ${data.cate_bg ?? "bg-color-blue-one"}`}
                            legacyBehavior>
                            {data.kategorija?.naziv_kategorije}
                        </Link>
                    </div>
                    <div className="axil-media-bottom">
                        <h3 className="axil-post-title hover-line hover-line">
                            <Link href={`${data.kategorija.kategorija_slug}/${data.slug}`} legacyBehavior>
                                {data.naslov}
                            </Link>
                        </h3>
                        <div className="post-metas">
                            <ul className="list-inline">
                                <li>
                                    <span>By</span>
                                    <Link
                                        href={`/author/${slugify(data.slug)}`}
                                        className="post-author"
                                        legacyBehavior>
                                        {data.naslov}
                                    </Link>
                                </li>
                                {postSizeLg === true ?
                                    <>
                                        <li>
                                            <i className="dot">.</i>{data.created_at}
                                        </li>
                                        <li>
                                            <i className="feather icon-activity" />
                                            {data.post_views}
                                        </li>
                                        <li>
                                            <i className="feather icon-share-2" />
                                            {data.post_share}
                                        </li>
                                    </>
                                    : ""}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of .post-block */}
        </div>
    );
};

export default PostLayoutThree;
