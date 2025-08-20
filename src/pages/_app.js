import "bootstrap/dist/css/bootstrap.css";
import "../styles/admin.css";
import "../styles/style.css";
import Script from "next/script";
import { ContextProvider, useStateContext } from "../contexts/StateContext";
import "moment/locale/sr";
import { useRouter } from "next/router";
import AdminLayout from "../layouts/AdminLayout";
import HuPLayout from "../layouts/HuPLayout";
import { SSRProvider } from "react-bootstrap";

function isAdminRoute(router) {
    return router.pathname.startsWith("/admin");
}

function MyApp({ Component, pageProps, router }) {
    const layoutProps =
        typeof Component.getLayoutProps === "function"
            ? Component.getLayoutProps(pageProps)
            : Component.getLayoutProps || {};

    const getLayout = isAdminRoute(router)
        ? (page) => <AdminLayout>{page}</AdminLayout>
        : (page) => {
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

    return (
        <ContextProvider>
            {getLayout(<Component {...pageProps} />)}
        </ContextProvider>
    );
}

export default MyApp;
