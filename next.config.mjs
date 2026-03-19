/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['sequelize', 'mysql2', 'pg-hstore', 'underscore']
};

export default nextConfig;
