/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0F0F",
        paper: "#F7F4EC",
        bone: "#FFFCF4",
        line: "#D8D2C3",
        muted: "#746F64",
        tell: {
          DEFAULT: "#078B88",
          deep: "#005F5D",
          light: "#D7F1EE",
          soft: "#EDF9F7",
          dark: "#042F2E"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "Fragment Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        rail: "0 1px 0 rgba(13, 15, 15, 0.12)",
        panel: "0 30px 90px rgba(4, 47, 46, 0.16)"
      },
      maxWidth: {
        report: "118rem"
      }
    }
  },
  plugins: []
};
