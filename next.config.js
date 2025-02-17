
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
  },

  webpack: (config) => {

    config.resolve.alias = {
      ...config.resolve.alias,
      // Fix deps that don't work with vite
      'stream': require.resolve('stream-browserify'),
      'zlib': require.resolve('browserify-zlib'),
      'util': require.resolve('util'),
    }

    // Important: return the modified config
    return config
  },
}

module.exports = nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
