import Image from "next/legacy/image";
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
                                                <a
                                                    href={`/tag/${tag.tag_slug}`}
                                                >
                                                    <Badge
                                                        pill
                                                        bg="light"
                                                        text="dark"
                                                        key={tag.tagid}
                                                    >
                                                        <i className="fa-solid fa-tag"></i>{" "}
                                                        {tag.tag_naziv}
                                                    </Badge>
                                                </a>
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
                                            <div
                                                className="povezano-pozoriste"
                                                key={poz.pozoristeid}
                                            >
                                                <a
                                                    href={`/pozorista/${poz.pozoriste_slug}`}
                                                >
                                                    <Image
                                                        src={poz.url_logo}
                                                        alt={poz.pozoriste_slug}
                                                        height={80}
                                                        width={100}
                                                        objectFit="cover"
                                                    />
                                                </a>
                                                <span key={poz.pozoristeid}>
                                                    <a
                                                        href={`/pozorista/${poz.pozoriste_slug}`}
                                                    >
                                                        {poz.naziv_pozorista}
                                                    </a>
                                                </span>
                                            </div>
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
