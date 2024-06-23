/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "340px",
      md: "640px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        altColor: "#eae0d5",
        dark: "#533e2d",
        secondaryColor: "#c6ac8f",
        secondaryLight: "#fff0f3",
        mainColor: "#7d4f50",
        bgDark: "#02111b",
        primaryLight: "#FFF7F2",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        heroBg: "url('/src/assets/hero-blob-solid.png')",
        authBg: "url('/images/ugs-bg.jpg')",
        LgBg: "url('/images/lg-bg-4.png')",
      },
      fontFamily: {
        bold: ["Bold"],
        extrabold: ["Extrabold"],
        thick: ["Black"],
        semibold: ["Semibold"],
        medium: ["Medium"],
        normal: ["Normal"],
        light: ["Light"],
        extralight: ["Extralight"],
        thin: ["Thin"],
        // normal: "Dosis_400Regular",
      },
      backgroundPosition: {
        "right-center": "right center",
        "bottom-center": "bottom center",
      },
    },
  },
  plugins: [],
};
