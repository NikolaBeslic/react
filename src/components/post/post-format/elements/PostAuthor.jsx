import Image from "next/legacy/image";
import Link from "next/link";

const PostAuthor = ({ authorData }) => {
    return (
        <>
            <div className="post-authors m-t-xs-60">
                <div className="widget-title">
                    <h3>
                        {authorData.autori.length > 1 ? "Autorke" : "Autorka"}
                    </h3>
                </div>
                {authorData.autori?.map((data) => (
                    <div
                        className="about-author m-b-xs-40"
                        key={data.autor_slug}
                    >
                        <div className="media">
                            <a href={`/autori/${data?.autor_slug}`}>
                                <Image
                                    src={data.url_slike}
                                    alt={data.autor_slug}
                                    height={105}
                                    width={105}
                                    className="author-img"
                                />
                            </a>
                            <div className="media-body">
                                <div className="media-body-title">
                                    <h3>
                                        <Link
                                            href={`/autori/${data?.autor_slug}`}
                                        >
                                            {data.ime_autora}
                                        </Link>
                                    </h3>
                                </div>
                                {/* End of .media-body-title */}
                                <div className="media-body-content">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data.biografija,
                                        }}
                                    ></div>
                                    <ul className="social-share social-share__with-bg">
                                        {/* {authorData.author_social.map((data, index) => (
                    <li key={index}><a href={data.url}><i className={data.icon} /></a></li>
                  ))} */}
                                    </ul>
                                    {/* End of .social-share__no-bg */}
                                </div>
                                {/* End of .media-body-content */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostAuthor;
