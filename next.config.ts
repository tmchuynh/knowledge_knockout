import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	webpack: ( config ) => {
		config.module.exprContextCritical = false;
		return config;
	},
};

export default nextConfig;
