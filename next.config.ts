import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/terms-and-conditions',
        destination: '/en/terms',
      },
      {
        source: '/terms-and-condition',
        destination: '/en/terms',
      },
      {
        source: '/:lang/terms-and-conditions',
        destination: '/:lang/terms',
      },
      {
        source: '/:lang/terms-and-condition',
        destination: '/:lang/terms',
      },
      {
        source: '/privacy',
        destination: '/en/privacy-policy',
      },
      {
        source: '/:lang/privacy',
        destination: '/:lang/privacy-policy',
      },
      {
        source: '/disclaimer',
        destination: '/en/risk-disclosure',
      },
      {
        source: '/:lang/disclaimer',
        destination: '/:lang/risk-disclosure',
      },
      {
        source: '/goal-calculator',
        destination: '/en/sip-calculator',
      },
      {
        source: '/:lang/goal-calculator',
        destination: '/:lang/sip-calculator',
      },
      {
        source: '/blog',
        destination: '/en/learn',
      },
      {
        source: '/:lang/blog',
        destination: '/:lang/learn',
      },
      {
        source: '/blog/:slug',
        destination: '/en/learn/:slug',
      },
      {
        source: '/:lang/blog/:slug',
        destination: '/:lang/learn/:slug',
      },
    ];
  },
};

export default nextConfig;
