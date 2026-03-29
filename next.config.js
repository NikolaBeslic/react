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
};

module.exports = nextConfig;
