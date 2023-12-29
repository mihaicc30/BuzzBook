/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeUP: "fadeUP 1s ease forwards",
        fadeIN: "fadeIN .4s ease forwards",
        fadeOUT: "fadeOUT .4s ease forwards"
      },
      keyframes: {
        fadeUP: {
          "0%": { transform: "scale(0.3)", transformOrigin: "top", opacity: ".3" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        fadeIN: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeOUT: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" }
        }
      }
    }
  },
  plugins: []
}
