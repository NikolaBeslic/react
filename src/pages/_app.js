import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";

import "../styles/admin.css";

import Script from "next/script";
import { ContextProvider, useStateContext } from "../contexts/StateContext";
import "moment/locale/sr";
import { useRouter } from "next/router";
import AdminLayout from "../layouts/AdminLayout";
import HuPLayout from "../layouts/HuPLayout";
import { SSRProvider } from "react-bootstrap";
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

function MyApp({ Component, pageProps, router }) {
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

    return (
        <ContextProvider>
            {getLayout(<Component {...pageProps} />)}
        </ContextProvider>
    );
}

export default MyApp;
