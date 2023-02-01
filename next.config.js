/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: '@next/font/local', options: {} },
    ],
  },
}

module.exports = nextConfig
