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
  // Skip static generation for dynamic routes
  experimental: {
    // This will make the auth callback page be rendered at runtime
    // instead of being statically generated
    missingSuspenseWithCSRBailout: false,
  },
  // Configure specific pages to be server-side rendered
  // instead of statically generated
  output: 'standalone',
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'vibecheck-build-' + Date.now();
  },
  // Skip prerendering for specific pages
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Remove the auth callback page from static generation
    delete defaultPathMap['/auth/callback'];

    return {
      ...defaultPathMap,
      '/auth/callback': { page: '/auth/callback' },
    };
  },
};

module.exports = nextConfig;
