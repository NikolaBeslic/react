import Head from "next/head";

const AdminHeader = ({ metaTitle }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="robots" content="noindex, follow" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="Hoću u pozorište admin panel" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>{`${metaTitle ? metaTitle : "Papr"} - Admin HuP`}</title>
        </Head>
    );
};

export default AdminHeader;
