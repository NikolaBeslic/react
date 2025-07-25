import Breadcrumb from "../../../../common/Breadcrumb";
import HeadMeta from "../../../../elements/HeadMeta";

const PredstaveHeader = () => {
    return (
        <>
            <HeadMeta metaTitle="Predstave" />
            <Breadcrumb aPage="Predstave" />
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    Predstave
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PredstaveHeader;
