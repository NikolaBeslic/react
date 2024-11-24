import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";

const PostLayoutThree = ({ data, postSizeLg, pClass, videoPost }) => {
    return (
        <div className={`axil-img-container ${pClass ?? "m-b-xs-30"}`}>
            <a
                href={`/post/${data.slug}`}
                className={`d-block ${videoPost === true ? "h-100" : ""}`}
                legacyBehavior>

                <Image
                    src={data.tekst_photo}
                    alt={data.title}
                    width={postSizeLg === true ? 730 : 350}
                    height={postSizeLg === true ? 550 : 260}
                    className="w-100"
                    objectFit="cover"
                />
                <div className={`grad-overlay ${videoPost === true ? "grad-overlay__transparent" : ""}`} />

            </a>
            <div className="media post-block position-absolute">
                <div className={`media-body ${postSizeLg === true ? "media-body__big" : ""}`}>
                    <div className="post-cat-group m-b-xs-10">
                    </div>
                    <div className="axil-media-bottom">
                        <h3 className="axil-post-title hover-line hover-line">
                            <Link href={`${data.kategorija?.kategorija_slug}/${data.slug}`} title={data.naslov} legacyBehavior>
                                {data.naslov}
                            </Link>
                        </h3>
                        <div className="post-metas">
                            <ul className="list-inline">
                                <li>
                                    <i className="fa-solid fa-masks-theater"></i> {data.predstave?.map((pred) => (<span key={pred.predstavaid}>{pred.naziv_predstave}</span>))}

                                </li>
                                {postSizeLg === true ?
                                    <>
                                        <li>
                                            <i className="fa-regular fa-calendar"></i> {moment(data.created_at).format("DD. MM. YYYY")}
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
