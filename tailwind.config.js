import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/components/(autocomplete|breadcrumbs|listbox|table|button|ripple|spinner|input|divider|popover|scroll-shadow|checkbox|spacer).js",
	],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				blue: {
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
				},
				teal: {
					100: "#a7f3d0",
					200: "#6ee7b7",
					300: "#34d399",
					400: "#10b981",
					500: "#14b8a6",
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e36",
				},
				indigo: {
					100: "#c7d2fe",
					200: "#a5b4fc",
					300: "#818cf8",
					400: "#6366f1",
					500: "#4f46e5",
					600: "#4338ca",
					700: "#3730a3",
					800: "#312e81",
					900: "#2c2a6e",
				},
				mint: {
					100: "#bbf7d0",
					200: "#86efac",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#6ee7b7",
					600: "#10b981",
					700: "#047857",
					800: "#065f46",
					900: "#064e36",
				},
				purple: {
					100: "#e9d5ff",
					200: "#d8b4fe",
					300: "#c084fc",
					400: "#a855f7",
					500: "#8b5cf6",
					600: "#7c3aed",
					700: "#6d28d9",
					800: "#5b21b6",
					900: "#4c1d95",
				},
				red: {
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
				},
				green: {
					100: "#d1fae5",
					200: "#a7f3d0",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#10b981",
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e36",
				},
				yellow: {
					100: "#fef3c7",
					200: "#fde68a",
					300: "#fcd34d",
					400: "#fbbf24",
					500: "#fbbf24",
					600: "#f59e0b",
					700: "#d97706",
					800: "#b45309",
					900: "#9c2c00",
				},
				brown: {
					100: "#e2d9d2",
					200: "#d1b6ab",
					300: "#b98e7e",
					400: "#9e7353",
					500: "#6d4c41",
					600: "#5c3c2b",
					700: "#4a2d1f",
					800: "#391e13",
					900: "#2f1009",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			animation: {
				gradient: "gradient 8s linear infinite",
				orbit: "orbit calc(var(--duration)*1s) linear infinite",
				marquee: "marquee var(--duration) infinite linear",
				"marquee-vertical": "marquee-vertical var(--duration) linear infinite",
				"shimmer-slide":
					"shimmer-slide var(--speed) ease-in-out infinite alternate",
				"spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
			},
			keyframes: {
				gradient: {
					to: {
						backgroundPosition: "var(--bg-size) 0",
					},
				},
				orbit: {
					"0%": {
						transform:
							"rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
					},
					"100%": {
						transform:
							"rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
					},
				},
				marquee: {
					from: {
						transform: "translateX(0)",
					},
					to: {
						transform: "translateX(calc(-100% - var(--gap)))",
					},
				},
				"marquee-vertical": {
					from: {
						transform: "translateY(0)",
					},
					to: {
						transform: "translateY(calc(-100% - var(--gap)))",
					},
				},
				"shimmer-slide": {
					to: {
						transform: "translate(calc(100cqw - 100%), 0)",
					},
				},
				"spin-around": {
					"0%": {
						transform: "translateZ(0) rotate(0)",
					},
					"15%, 35%": {
						transform: "translateZ(0) rotate(90deg)",
					},
					"65%, 85%": {
						transform: "translateZ(0) rotate(270deg)",
					},
					"100%": {
						transform: "translateZ(0) rotate(360deg)",
					},
				},
			},
		},
	},
	darkMode: ["class", "class"],
	plugins: [
		nextui(),
		require("tailwindcss-animate"),
		require("tailwindcss-animate"),
	],
};
