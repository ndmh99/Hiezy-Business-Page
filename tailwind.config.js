/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./data/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        paper: "var(--paper)",
        slate: "var(--slate)",
        slate2: "var(--slate-2)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        border: "var(--border)",
      },
      fontFamily: {
        sansita: ["Sansita", "sans-serif"],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(29, 78, 216, 0)' },
          '50%': { boxShadow: '0 0 0 8px rgba(29, 78, 216, 0.2)' }
        }
      }
    }
  }
}
