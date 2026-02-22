import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "../styles/admin.css";
import { useState, useEffect } from "react";
import { ContextProvider } from "../contexts/StateContext";
import "moment/locale/sr";
import AdminLayout from "../layouts/AdminLayout";
import HuPLayout from "../layouts/HuPLayout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";

import {
    ModuleRegistry,
    AllCommunityModule, // or AllEnterpriseModule
} from "ag-grid-community";
import AdminAuthLayout from "../layouts/AdminAuthLayout";

// Register AG Grid modules ONCE
ModuleRegistry.registerModules([AllCommunityModule]);

config.autoAddCss = false;
function isAdminRoute(router) {
    return router.pathname.startsWith("/admin");
}

function isAdminLoginRoute(router) {
    return router.pathname.startsWith("/hup-admin");
}

function PageLoader({ show }) {
    if (!show) return null;
    return (
        <div className="page-loader">
            <div className="spinner" />
            <style jsx>{`
                .page-loader {
                    position: fixed;
                    inset: 0;
                    background: rgba(255, 255, 255, 0.65);
                    backdrop-filter: blur(2px);
                    display: grid;
                    place-items: center;
                    z-index: 9999;
                }
                .spinner {
                    width: 44px;
                    height: 44px;
                    border: 4px solid rgba(0, 0, 0, 0.12);
                    border-top-color: rgba(0, 0, 0, 0.55);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}

function MyApp({ Component, pageProps, router }) {
    const [loading, setLoading] = useState(false);
    const layoutProps =
        typeof Component.getLayoutProps === "function"
            ? Component.getLayoutProps(pageProps)
            : Component.getLayoutProps || {};

    let getLayout = "";

    if (isAdminLoginRoute(router)) {
        getLayout = (page) => {
            return <AdminAuthLayout>{page}</AdminAuthLayout>;
        };
    } else if (isAdminRoute(router)) {
        getLayout = (page) => {
            return <AdminLayout>{page}</AdminLayout>;
        };
    } else {
        getLayout = (page) => {
            const header = layoutProps?.header ?? null;
            const noSidebar = layoutProps?.noSidebar ?? false;
            const isNaslovna = layoutProps?.isNaslovna ?? false;
            return (
                <HuPLayout
                    header={header}
                    noSidebar={noSidebar}
                    isNaslovna={isNaslovna}
                >
                    {page}
                </HuPLayout>
            );
        };
    }

    useEffect(() => {
        let t;
        const start = () => {
            // small delay prevents flicker on fast transitions
            t = setTimeout(() => setLoading(true), 150);
        };
        const done = () => {
            clearTimeout(t);
            setLoading(false);
        };

        router.events.on("routeChangeStart", start);
        router.events.on("routeChangeComplete", done);
        router.events.on("routeChangeError", done);

        return () => {
            clearTimeout(t);
            router.events.off("routeChangeStart", start);
            router.events.off("routeChangeComplete", done);
            router.events.off("routeChangeError", done);
        };
    }, [router.events]);

    return (
        <ContextProvider>
            <PageLoader show={loading} />
            {getLayout(<Component {...pageProps} />)}
        </ContextProvider>
    );
}

export default MyApp;
