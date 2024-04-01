/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'img.ltwebstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.s3.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
