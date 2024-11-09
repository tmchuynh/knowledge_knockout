import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'cool-blue': {
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Base color
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'cool-teal': {
          100: '#a7f3d0',
          200: '#6ee7b7',
          300: '#34d399',
          400: '#10b981',
          500: '#14b8a6',  // Base color
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e36',
        },
        'cool-indigo': {
          100: '#c7d2fe',
          200: '#a5b4fc',
          300: '#818cf8',
          400: '#6366f1',
          500: '#4f46e5',  // Base color
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#2c2a6e',
        },
        'cool-mint': {
          100: '#bbf7d0',
          200: '#86efac',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#6ee7b7',  // Base color
          600: '#10b981',
          700: '#047857',
          800: '#065f46',
          900: '#064e36',
        },
        'cool-purple': {
          100: '#e9d5ff',
          200: '#d8b4fe',
          300: '#c084fc',
          400: '#a855f7',
          500: '#8b5cf6',  // Base color
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },

        // Complementary colors
        'cool-red': {
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Base color
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        'cool-green': {
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',  // Base color
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e36',
        },
        'cool-yellow': {
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#fbbf24',  // Base color
          600: '#f59e0b',
          700: '#d97706',
          800: '#b45309',
          900: '#9c2c00',
        },
        'cool-brown': {
          100: '#e2d9d2',
          200: '#d1b6ab',
          300: '#b98e7e',
          400: '#9e7353',
          500: '#6d4c41',  // Base color
          600: '#5c3c2b',
          700: '#4a2d1f',
          800: '#391e13',
          900: '#2f1009',
        },
      },
    },
  },
  plugins: [],
};

export default config;
