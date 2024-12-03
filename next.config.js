// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GARMIN_API_KEY: process.env.NEXT_PUBLIC_GARMIN_API_KEY,
    NEXT_PUBLIC_CLAUDE_ENDPOINT: process.env.NEXT_PUBLIC_CLAUDE_ENDPOINT,
    NEXT_PUBLIC_GPT_ENDPOINT: process.env.NEXT_PUBLIC_GPT_ENDPOINT,
  },
  images: {
    domains: ["example.com", "api.example.com"],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "src"),
    };
    return config;
  },
};

module.exports = nextConfig;
