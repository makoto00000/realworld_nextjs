/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.imgur.com','loremflickr.com'],
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
