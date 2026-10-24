import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0e10", // negro del archivo y del texto
        paper: "#ffffff",
        mist: "#f4f4f2", // superficies suaves
        frame: "#dcdcdb", // fondo de las fotos de producto (igual al de la foto)
        line: "#e4e4e1",
        muted: "#6e6e6c",
        burgundy: {
          DEFAULT: "#7a1424",
          bright: "#b31b31", // acento sobre fondos oscuros
        },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        label: "0.28em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
