/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  i18n: {
    locales: ['en-US', 'ru-RU'],
    defaultLocale: 'ru-RU',
    localeDetection: false,
  },
};

module.exports = nextConfig;
