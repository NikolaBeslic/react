import { useMediaQuery } from "react-responsive";
import Breadcrumb from "../../../../common/Breadcrumb";
import HeadMeta from "../../../../elements/HeadMeta";

const RepertoariHeader = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    return (
        <>
            <HeadMeta metaTitle="Repertoari" />
            {!isTabletOrMobile && <Breadcrumb aPage="Repertoari" />}
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">
                                    Repertoari
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RepertoariHeader;
