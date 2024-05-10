/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {protocol: 'https', hostname: 'cdn.physicsinventory.app'},
            {protocol: 'https', hostname: 'khd5028k-dev.nyc3.cdn.digitaloceanspaces.com'}
        ]
    }
}

module.exports = nextConfig
