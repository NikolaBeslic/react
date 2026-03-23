import Head from "next/head";

const HeadMeta = ({ metaTitle, metaDescription, metaUrl, metaImage }) => {
    const title = `${metaTitle ? metaTitle : " "} || Hoću u pozorište`;
    const url = process.env.NEXT_PUBLIC_SSR_REQ_ORIGIN + (metaUrl ?? "");
    const image = process.env.NEXT_PUBLIC_SSR_REQ_ORIGIN + (metaImage ?? "");
    const description =
        metaDescription ??
        "Hoću u pozorište je portal namenjen promociji pozorišta u Srbiji";

    return (
        <Head>
            {/* Basic metas */}
            <meta charSet="utf-8" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>{title}</title>
            <link rel="icon" type="image/x-icon" href={`/favicon.ico`} />
            <link rel="canonical" href={url} />

            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Hoću u pozorište" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
};

export default HeadMeta;
