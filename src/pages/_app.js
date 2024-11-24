import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import Script from 'next/script';
import { ContextProvider, useStateContext, showLoading, hideLoading } from "../contexts/StateContext";
import { useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/sr';
import ScrollToTopButton from "../components/post/post-format/elements/ScrollToTop";

function MyApp({ Component, pageProps }) {
  moment.locale('sr');

  const { isAdmin, showLoading, hideLoading } = useStateContext();

  useEffect(() => {
    console.log(isAdmin);
  }, []);
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
      <Script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></Script >
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
      <ScrollToTopButton />
    </>
  )
}

export default MyApp
