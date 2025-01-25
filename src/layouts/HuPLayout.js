import { Toaster } from "react-hot-toast";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";

const HuPLayout = ({ children }) => {
    return (
        <>
            <HeadMeta metaTitle="Dobrodošli" />
            <HeaderOne />
            <main>{children}</main>
            <Toaster position="top-right" reverseOrder={false} />
            <FooterOne />
        </>
    );
};

export default HuPLayout;
