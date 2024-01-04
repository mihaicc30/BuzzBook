/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeUP: "fadeUP 1s ease forwards",
        fadeIN: "fadeIN .4s ease forwards",
        fadeINinfinite: "fadeIN 2s ease infinite",
        fadeOUT: "fadeOUT .4s ease forwards",
        fadeRightToLeft: "fadeRightToLeft .4s ease forwards",
        fadeLeftToRight: "fadeLeftToRight .4s ease forwards",
        hueRotate: "hueRotate 1s linear infinite",
      },
      keyframes: {
        fadeUP: {
          "0%": { transform: "scale(0.3)", transformOrigin: "top", opacity: ".3" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        fadeRightToLeft: {
          "0%": { transform: "translateX(100%)", transformOrigin: "center", opacity: ".3" },
          "100%": { transform: "translateX(0%)", opacity: "1" }
        },
        fadeLeftToRight: {
          "0%": { transform: "translateX(0%)", opacity: "1" },
          "100%": { transform: "translateX(100%)", transformOrigin: "center", opacity: ".3" },
        },
        fadeIN: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeOUT: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" }
        },
        hueRotate: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" }
        }
      }
    }
  },
  plugins: []
}
