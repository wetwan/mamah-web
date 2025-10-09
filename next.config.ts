


import type { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  // Other configuration options can go here
  // reactStrictMode: true,

  // This section allows the Next.js Image component to load images
  // from external, non-whitelisted domains using the provided pattern.
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        // The wildcard in the hostname allows fetching images from any domain over HTTPS
        hostname: '**', 
      }
    ]
  }
};

export default nextConfig;
