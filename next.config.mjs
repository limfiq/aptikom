/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['sequelize', 'mysql2', 'pg-hstore', 'underscore']
};

export default nextConfig;
