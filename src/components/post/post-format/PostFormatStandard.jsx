import Image from "next/legacy/image";
import PredstaveLayout from "../layout/PredstaveLayout";
import RelatedPosts from "../RelatedPosts";
import PostAuthor from "./elements/PostAuthor";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

const PostFormatStandard = ({ postData, relatedPosts }) => {
    return (
        <>
            <main className="site-main">
                <article className="post-details">
                    <div className="single-blog-wrapper">
                        <div className="container">
                            <div className="single-text-wrapper">
                                {/* <SocialShareSide /> */}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: postData.sadrzaj,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </article>
                <div className="single-blog-wrapper">
                    <div className="container">
                        <div className="single-text-wrapper">
                            {/* HuPkast start */}
                            {postData.kategorijaid == 11 && (
                                <div className="m-t-xs-30">
                                    {postData.hupkast.linkovi.map((link) => (
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
                            )}
                            {/* HuPkast end */}
                            {postData.tagovi?.length > 0 && (
                                <>
                                    <div className="widget-title m-t-xs-40">
                                        <h3>Tagovi</h3>
                                    </div>
                                    <Stack
                                        direction="horizontal"
                                        gap={2}
                                        className="post-tags-stack"
                                    >
                                        {postData.tagovi.map((tag) => (
                                            <a
                                                href={`/tag/${tag.tag_slug}`}
                                                key={tag.tagid}
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

                            {postData.autori?.length > 0 && (
                                <PostAuthor authorData={postData} />
                            )}
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
                                            showPozoriste={true}
                                        />
                                    ))}
                                </>
                            )}
                            {relatedPosts?.length > 0 && (
                                <RelatedPosts relatedPosts={relatedPosts} />
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
                        </div>
                    </div>
                </div>
                {/* <SocialShareBottom /> */}
            </main>
        </>
    );
};

export default PostFormatStandard;
