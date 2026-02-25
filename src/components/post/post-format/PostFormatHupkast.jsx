import RelatedPosts from "../RelatedPosts";

const PostFormatHupkast = ({ postData }) => {
    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper">
                    <div className="m-b-xs-50">
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

                    <div className="m-b-xs-30 row">
                        <div className="hupkast-links-wrap">
                            <p>Ili na:</p>
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
