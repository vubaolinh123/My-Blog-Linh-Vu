/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://project-blog-api.vercel.app/api/:path*', // Proxy to Backend
            },
        ];
    },
};

module.exports = nextConfig;
