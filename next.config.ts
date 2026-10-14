import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma", "nodemailer"],
  experimental: {
    proxyClientMaxBodySize: "5mb",
  },
};

export default nextConfig;
