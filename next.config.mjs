/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'mysql2', 'pg-hstore', 'underscore']
  }
};

export default nextConfig;
