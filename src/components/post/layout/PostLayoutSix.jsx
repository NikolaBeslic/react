import Image from "next/image";
import Link from "next/link";

const PostLayoutSix = ({ data }) => {

    return (
        <div className="axil-img-container m-b-xs-15 m-b-sm-30">
            <a href={`/predstave/${data.predstava_slug}`} className="d-block" legacyBehavior>

                <Image
                    src={data.plakat}
                    alt={data.naziv_predstave}
                    width={390}
                    height={390}
                />
                <div className="grad-overlay grad-overlay__transparent" />

            </a>
            <div className="media post-block grad-overlay position-absolute">
                <div className="media-body justify-content-end">
                    <div className="post-cat-group m-b-xs-10">
                        <a
                            href={`/predstave/${(data.predstava_slug)}`}
                            className={`post-cat cat-btn btn-mid bg-color-blue-one"}`}
                            legacyBehavior>
                            Komedija
                        </a>
                    </div>
                    <div className="axil-media-bottom">
                        <h3 className="axil-post-title hover-line m-b-xs-0">
                            <a href={`/predstave/${data.predstava_slug}`} legacyBehavior>
                                {data.naziv_predstave}
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
            {/* End of .post-block */}
        </div>
    );
};

export default PostLayoutSix;
