/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Configure output for better optimization
  output: 'standalone',
  // Generate a unique build ID for each deployment
  generateBuildId: async () => {
    return 'vibecheck-build-' + Date.now();
  },
};

module.exports = nextConfig;
