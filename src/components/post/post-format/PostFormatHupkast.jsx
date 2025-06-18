const PostFormatHupkast = ({ postData }) => {
    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper">
                    <div
                        dangerouslySetInnerHTML={{ __html: postData.sadrzaj }}
                    ></div>
                    <div className="m-t-xs-30">
                        {postData.hupkast?.linkovi.map((link) => (
                            <p key={link.platformaid}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.platforma_icon,
                                    }}
                                ></span>{" "}
                                {link.naziv_platforme} :{" "}
                                <a
                                    href={link.pivot.hupkast_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {link.pivot.hupkast_url}
                                </a>{" "}
                            </p>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default PostFormatHupkast;
