import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetPremijere from "../../widget/WidgetPremijere";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import PredstaveLayout from "../layout/PredstaveLayout";
import RelatedPosts from "../RelatedPosts";
import MetaDataOne from "./elements/meta/MetaDataOne";
import PostAuthor from "./elements/PostAuthor";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

const PostFormatStandard = ({
    postData,
    relatedPosts,
    sidePosts,
    premijere,
}) => {
    return (
        <>
            <MetaDataOne metaData={postData} />
            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <article className="post-details">
                                    <div className="single-blog-wrapper">
                                        {/* <SocialShareSide /> */}
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: postData.sadrzaj,
                                            }}
                                        ></div>

                                        {/* HuPkast start */}
                                        {postData.kategorijaid == 11 && (
                                            <div className="m-t-xs-30">
                                                {postData.hupkast.linkovi.map(
                                                    (link) => (
                                                        <p
                                                            key={
                                                                link.platformaid
                                                            }
                                                        >
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.platforma_icon,
                                                                }}
                                                            ></span>{" "}
                                                            {
                                                                link.naziv_platforme
                                                            }{" "}
                                                            :{" "}
                                                            <a
                                                                href={
                                                                    link.pivot
                                                                        .hupkast_url
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                {
                                                                    link.pivot
                                                                        .hupkast_url
                                                                }
                                                            </a>{" "}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        )}
                                        {/* HuPkast end */}
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

                                        <span>
                                            {postData.festival.naziv_festivala}
                                        </span>
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
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                {/* <RelatedPosts relatedPosts={sidePosts} /> */}
                                <WidgetPost posts={sidePosts} />
                                <WidgetNewsletter />
                                <WidgetPremijere premijere={premijere} />
                                <WidgetInstagram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostFormatStandard;
