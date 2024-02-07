/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // sm: "375px", '640px'
    // md: "744px", 768px
    // lg: "1133px", 1024px
    // xl: "1280px", 1280px
    // "2xl": "1920x", 1536px
    extend: {
      colors: {
        blue: "#1041ED",
        "gray-50": "#EAEAEC",
        "gray-200": "#DADBDE",
        "gray-400": "#C3C5CA",
        "gray-600": "#898D9A",
        "gray-800": "#525766",
        "gray-950": "#2D2E3B",
        orange: "#F2B10B",
        red: "#CA1242",
        teal: "#11B78F",
        transparent: "transparent",
        white: "#FFFFFF",
      },
      screens: {
        tablet: "744px",
        tablet2: "1133px",
        laptop: "1280px",
      },
    },
  },
  plugins: [],
};
