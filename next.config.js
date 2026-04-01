/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    basePath: "", //process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.hocupozoriste.rs",
                pathname: "/**",
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: "/slike/:path*",
                destination: "https://api.hocupozoriste.rs/slike/:path*",
            },
        ];
    },

    async redirects() {
        return [
            {
                source: "/vesti/:slug(hup-oko-sveta.*)",
                destination: "/hup-oko-sveta/:slug",
                permanent: true,
            },
            {
                source: "/vesti/:slug(hupopedija.*)",
                destination: "/hupopedija/:slug",
                permanent: true,
            },
            {
                source: "/vesti/:slug(preporuke.*)",
                destination: "/preporuke/:slug",
                permanent: true,
            },
            {
                source: "/intervjui/:slug(na-kafi-sa.*)",
                destination: "/na-kafi-sa/:slug",
                permanent: true,
            },
            {
                source: "/drame",
                destination: "/predstave?zanrovi=1",
                permanent: true,
            },
            {
                source: "/komedije",
                destination: "/predstave?zanrovi=2",
                permanent: true,
            },
            {
                source: "/opere",
                destination: "/predstave?zanrovi=3",
                permanent: true,
            },
            {
                source: "/baleti",
                destination: "/predstave?zanrovi=4",
                permanent: true,
            },
            {
                source: "/mjuzikli",
                destination: "/predstave?zanrovi=5",
                permanent: true,
            },
            {
                source: "/predstave-za-decu",
                destination: "/predstave?zanrovi=6",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
