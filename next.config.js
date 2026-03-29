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
            },
            {
                protocol: "https",
                hostname: "www.hocupozoriste.rs",
            },
        ],
    },
};

module.exports = nextConfig;
