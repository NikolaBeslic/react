import RelatedPosts from "../RelatedPosts";

const PostFormatHupkast = ({ postData }) => {
    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper p-t-xs-40 p-t-md-60">
                    <div className="m-b-xs-30">
                        {postData.hupkast?.mp3_url && (
                            <>
                                <p>Slušajte ovde:</p>
                                <audio controls>
                                    <source
                                        src={`${postData.hupkast?.mp3_url}`}
                                        type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            </>
                        )}
                    </div>

                    <div className="m-b-xs-30">
                        <p className="hupkast-links-text">Ili na:</p>
                        <div className="hupkast-links-wrap">
                            <div className="btn-group">
                                {postData.hupkast?.linkovi.map((link) => (
                                    <a
                                        className="btn btn-small"
                                        href={link.pivot.hupkast_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            backgroundColor:
                                                link.platforma_boja,
                                        }}
                                        key={`pltfrm-${link.platformaid}`}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.platforma_icon,
                                            }}
                                        ></span>{" "}
                                        {link.naziv_platforme}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className="m-b-xs-50"
                        dangerouslySetInnerHTML={{ __html: postData.sadrzaj }}
                    ></div>
                    {postData.relatedHupkasts?.length > 0 && (
                        <RelatedPosts relatedPosts={postData.relatedHupkasts} />
                    )}
                </div>
            </main>
        </>
    );
};

export default PostFormatHupkast;
