import PredstaveLayout from "../layout/PredstaveLayout";
import RelatedPosts from "../RelatedPosts";
import PostAuthor from "./elements/PostAuthor";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

const PostFormatHupikon = ({
    postData,
    relatedPosts,
    sidePosts,
    premijere,
}) => {
    return (
        <>
            <main className="site-main">
                <article className="post-details">
                    <div className="single-blog-wrapper">
                        <h3 className="text-center">{postData.naslov}</h3>
                        <blockquote
                            className="m-t-xs-0 m-b-xs-30"
                            dangerouslySetInnerHTML={{
                                __html: postData.hupikon.biografija,
                            }}
                        ></blockquote>

                        {/* <SocialShareSide /> */}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: postData.sadrzaj,
                            }}
                        ></div>
                    </div>
                </article>
                {/* <SocialShareBottom /> */}

                {postData.tagovi?.length > 0 && (
                    <>
                        <hr className="m-t-xs-30 m-b-xs-30" />
                        <Stack direction="horizontal" gap={2}>
                            {postData.tagovi.map((tag) => (
                                <Badge
                                    pill
                                    bg="light"
                                    text="dark"
                                    key={tag.tagid}
                                >
                                    <i className="fa-solid fa-tag"></i>{" "}
                                    {tag.tag_naziv}
                                </Badge>
                            ))}
                        </Stack>
                    </>
                )}
                <hr className="m-t-xs-30 m-b-xs-30" />
                <PostAuthor authorData={postData} />
                {postData.predstave?.length > 0 && (
                    <>
                        <div className="widget-title">
                            <h3>Povezane predstave</h3>
                        </div>
                        {postData.predstave.map((pred) => (
                            <PredstaveLayout
                                data={pred}
                                pClass=""
                                key={pred.predstavaid}
                            />
                        ))}
                    </>
                )}
                {postData.festival && (
                    <>
                        <div className="widget-title">
                            <h3>Povezani festival</h3>
                        </div>

                        <span>{postData.festival.naziv_festivala}</span>
                    </>
                )}
                {postData.pozorista?.length > 0 && (
                    <>
                        <div className="widget-title">
                            <h3>Povezana pozorista</h3>
                        </div>
                        {postData.pozorista.map((poz) => (
                            <span key={poz.pozoristeid}>
                                {poz.naziv_pozorista}
                            </span>
                        ))}
                    </>
                )}

                {/* <PostComment /> */}
                {relatedPosts?.length > 0 && (
                    <RelatedPosts relatedPosts={relatedPosts} />
                )}
            </main>
        </>
    );
};

export default PostFormatHupikon;
