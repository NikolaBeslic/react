import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider, useUser } from "../contexts/UserContext";

import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import Sidebar from "../components/sidebar/Sidebar";
import ScrollToTopButton from "../components/post/post-format/elements/ScrollToTop";

const HuPLayoutInner = ({
    header,
    children,
    noSidebar = false,
    isNaslovna = false,
}) => {
    const { loading, user } = useUser();

    useEffect(() => {
        document.body.classList.add("hup-layout-body");
        return () => document.body.classList.remove("hup-layout-body");
    }, []);

    console.log(loading);

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
                            {noSidebar ? (
                                <div className="col-lg-12">{children}</div>
                            ) : (
                                <>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                {children}
                                            </div>
                                            <div className="col-lg-4">
                                                <Sidebar />
                                            </div>
                                        </div>
                                    </div>
                                    <ScrollToTopButton />
                                </>
                            )}
                        </div>
                    )}
                </main>
                <Toaster position="top-right" reverseOrder={false} />
                <FooterOne />
            </div>
        </>
    );
};

export default function HuPLayout({
    children,
    header,
    noSidebar = false,
    isNaslovna = false,
}) {
    return (
        <UserProvider>
            <HuPLayoutInner
                header={header}
                noSidebar={noSidebar}
                isNaslovna={isNaslovna}
            >
                {children}
            </HuPLayoutInner>
        </UserProvider>
    );
}
