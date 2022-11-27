/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: process.env.NEXT_PUBLIC_SOURCE_API,
                destination: process.env.NEXT_PUBLIC_URL_PROXY_BACK_END, // Proxy to Backend
            },
        ];
    },
};

module.exports = nextConfig;
