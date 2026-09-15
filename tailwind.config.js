/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-bg': 'var(--bg)',
        'theme-panel': 'var(--panel)',
        'theme-panel-2': 'var(--panel-2)',
        'theme-border': 'var(--border)',
        'theme-text': 'var(--text)',
        'theme-muted': 'var(--muted)',
        'theme-teal': 'var(--teal)',
        'theme-amber': 'var(--amber)',
      },
      fontFamily: {
        space: ['var(--font-space)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        'theme': 'var(--radius)',
      },
      maxWidth: {
        'content': 'var(--max-w)',
      },
      animation: {
        'blink': 'blink 1.1s steps(1) infinite',
        'pulse-slow': 'pulse 1.6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
