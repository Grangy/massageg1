/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration to allow external domains for next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Preserve existing headers configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *",
          },
        ],
      },
    ];
  },

  // Additional recommended settings
  reactStrictMode: true, // Enables React Strict Mode for better error detection
  trailingSlash: false, // Ensures consistent URL handling
  poweredByHeader: false, // Removes the X-Powered-By header for security
  swcMinify: true, // Enables SWC minifier for faster builds
};

module.exports = nextConfig;