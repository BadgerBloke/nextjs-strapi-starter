/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const { withAxiom } = require('next-axiom');

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'i9.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

module.exports = withAxiom(nextConfig);
