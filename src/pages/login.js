import LoginPage from "../components/auth/LoginPage";
import Breadcrumb from "../components/common/Breadcrumb";
import BreadcrumbBanner from "../components/common/BreadcrumbBanner";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";

export default function Login() {

    return (
        <>
            <HeadMeta metaTitle="Login" />
            <HeaderOne />
            <Breadcrumb aPage="Login" />
            <BreadcrumbBanner pageTitle="Login" />
            <LoginPage />
            <FooterOne />
        </>
    )
}
