const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'coalasaude.s3.amazonaws.com' },
      { hostname: 'coalasaude.s3.us-east-1.amazonaws.com' },
      { hostname: 'coalasaude.s3.sa-east-1.amazonaws.com' },
      { hostname: 'coalasaude.s3.sa-east-1.amazonaws.com' },
      { hostname: 'dev-coalasaude.s3.us-east-1.amazonaws.com' },
      { hostname: 'dev-coalasaude.s3.amazonaws.com' },
      { hostname: 'dev-coalasaude.s3.amazonaws.com' },
      { hostname: 'prod-coalasaude.s3.us-east-1.amazonaws.com' },
      { hostname: 'prod-coala-public.s3.amazonaws.com' },
      { hostname: 'uploads-ssl.webflow.com' },
      { hostname: 'cdn.prod.website-files.com' },
    ],
  },
  env: {
    ROOM_MEET_BASE_URL: process.env.ROOM_MEET_BASE_URL,
    SUPPORT_URL: process.env.SUPPORT_URL,
    INTERCOM_APP_ID: process.env.INTERCOM_APP_ID,
    PUBLIC_KEY_STRIPE: process.env.PUBLIC_KEY_STRIPE,
    INTERCOM_SECRET: process.env.INTERCOM_SECRET,
    APP_URL: process.env.APP_URL,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    GA_CONVERSION_ID: process.env.GA_CONVERSION_ID,
    NEXT_PUBLIC_BASE_URL_API: process.env.NEXT_PUBLIC_BASE_URL_API,
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
    HOTJAR_ID: process.env.HOTJAR_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    JITSI_API_KEY: process.env.JITSI_API_KEY,
    VIDEOSDK_API_KEY: process.env.VIDEOSDK_API_KEY,
    WHATSAPP_SUPPORT_URL: process.env.WHATSAPP_SUPPORT_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: false,
            titleProp: true,
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[name].[ext]',
          esModule: false,
        },
      },
    })

    return config
  },
}

module.exports = nextConfig

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    silent: true,
    org: 'coala-saude',
    project: 'coala-fe-prod',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
)

module.exports = withBundleAnalyzer(nextConfig)
