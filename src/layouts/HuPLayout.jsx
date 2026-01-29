import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import Sidebar from "../components/sidebar/Sidebar";
import ScrollToTopButton from "../components/post/post-format/elements/ScrollToTop";

export default function HuPLayout({
    header,
    children,
    noSidebar = false,
    isNaslovna = false,
}) {
    useEffect(() => {
        document.body.classList.add("hup-layout-body");
        return () => document.body.classList.remove("hup-layout-body");
    }, []);

    return (
        <>
            <div className="user-layout">
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
                                        <div className="col-lg-12">
                                            {children}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="col-lg-8">
                                                {children}
                                            </div>
                                            <div className="col-lg-4">
                                                <Sidebar />
                                            </div>
                                            <ScrollToTopButton />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
                <Toaster position="top-right" reverseOrder={false} />
                <FooterOne />
            </div>
        </>
    );
}
