// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
import { type Config } from 'tailwindcss';
import colors from 'tailwindcss/colors.js';

export default {
  content: ['{routes,islands,components}/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      mono: [
        'DM Mono',
        'Menlo',
        'Monaco',
        '"Lucida Console"',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
      sans: [
        'DM Sans',
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
      ],
      serif: [
        'DM Serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        gray: colors.neutral,
        primary: '#76bb25',
        secondary: '#4338ca',
      },
      spacing: {
        1.75: '0.4375rem',
        4.5: '1.125rem',
        72: '18rem',
        88: '22rem',
      },
      borderWidth: {
        '0': '0',
        '1': '1px',
        '1.5': '1.5px',
      },
      boxShadow: {
        'accent': `8px 14px 0 0 #64748b55`,
        'accent-sm': `5px 6px 0 0 #64748b55`,
        'accent-sm-close': `1px 2px 0 0 #64748b55`,
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      animation: {
        'fade-in': 'fade-in 0.7s cubic-bezier(0, 0.63, 0.5, 1) forwards',
        'fade-in-late': 'fade-in-late 1s ease-in',
        'scroll-x': 'scroll-x 10s linear infinite',
        'scroll-y': 'scroll-y 10s linear infinite',
        'rotate-180': 'rotate-180 0.3s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-late': {
          '0%': { opacity: '0' },
          '75%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-y': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'rotate-180': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
