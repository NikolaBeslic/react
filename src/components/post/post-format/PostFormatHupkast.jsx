import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import MetaDataHupkast from "./elements/meta/MetaDataHupkast";

const PostFormatHupkast = ({ postData }) => {
    return (
        <>
            <MetaDataHupkast metaData={postData} />
            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <div className="single-blog-wrapper">
                                    <div dangerouslySetInnerHTML={{ __html: postData.sadrzaj }}></div>
                                    <div className="m-t-xs-30">
                                        {postData.hupkast?.linkovi.map((link) => <p key={link.platformaid}><span dangerouslySetInnerHTML={{ __html: link.platforma_icon }}></span> {link.naziv_platforme} : <a href={link.pivot.hupkast_url} target="_blank" rel="noreferrer">{link.pivot.hupkast_url}</a> </p>)}
                                    </div>
                                </div>
                            </main>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetNewsletter />
                                <WidgetSocialShare />
                                {/* <WidgetPost dataPost={allData} /> */}
                                <WidgetInstagram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostFormatHupkast;
