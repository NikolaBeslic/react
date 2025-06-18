import { Toaster } from "react-hot-toast";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import Sidebar from "../components/sidebar/Sidebar";

const HuPLayout = ({
    header,
    children,
    noSidebar = false,
    isNaslovna = false,
}) => {
    return (
        <>
            <HeaderOne />
            {/*  */}
            {header}
            <main>
                {isNaslovna ? (
                    <>{children}</>
                ) : (
                    <div className="post-single-wrapper p-t-xs-60">
                        <div className="container">
                            <div className="row">
                                {noSidebar ? (
                                    <div className="col-lg-12">{children}</div>
                                ) : (
                                    <>
                                        <div className="col-lg-8">
                                            {children}
                                        </div>
                                        <div className="col-lg-4">
                                            <Sidebar />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Toaster position="top-right" reverseOrder={false} />
            <FooterOne />
        </>
    );
};

export default HuPLayout;
