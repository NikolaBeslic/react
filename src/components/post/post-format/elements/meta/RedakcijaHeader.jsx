import HeadMeta from "../../../../elements/HeadMeta";
import Breadcrumb from "../../../../common/Breadcrumb";
import BreadcrumbBanner from "../../../../common/BreadcrumbBanner";

const RedakcijaHeader = () => {
    return (
        <>
            <HeadMeta metaTitle="Redakcija" />
            <Breadcrumb aPage="Redakcija" />
            <BreadcrumbBanner pageTitle="Redakcija" />
        </>
    );
};

export default RedakcijaHeader;
