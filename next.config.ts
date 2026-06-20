import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // sharp is a native module — keep it external so it's required from
  // node_modules at runtime instead of bundled by Turbopack.
  serverExternalPackages: ["sharp"],
};

export default nextConfig;
