import "bootstrap/dist/css/bootstrap.css";
import "../styles/admin.css";
// import "../styles/style.css";
import Script from "next/script";
import { ContextProvider, useStateContext } from "../contexts/StateContext";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/sr";
import ScrollToTopButton from "../components/post/post-format/elements/ScrollToTop";
import { useRouter } from "next/router";
import AdminLayout from "../layouts/AdminLayout";
import HuPLayout from "../layouts/HuPLayout";

function MyApp({ Component, pageProps }) {
    moment.locale("sr");
    const { isAdmin, showLoading, hideLoading } = useStateContext();
    const router = useRouter();
    const isAdminRoute = router.pathname.startsWith("/admin");
    const getLayout = isAdminRoute
        ? (page) => <AdminLayout>{page}</AdminLayout>
        : (page) => <HuPLayout>{page}</HuPLayout>; // Use default layout for other pages

    useEffect(() => {}, []);
    return (
        <>
            {/*  Global site tag (gtag.js) - Google Analytics */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-E448GXQHG8"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-E448GXQHG8');
      `}
            </Script>

            <ContextProvider>
                {getLayout(<Component {...pageProps} />)}
            </ContextProvider>
            <ScrollToTopButton />
        </>
    );
}

export default MyApp;
