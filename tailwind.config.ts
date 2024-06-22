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
        secondaryAlt: "#fb5607",
        secondaryLight: "#fff0f3",
        mainColor: "#7d4f50",
        bgDark: "#02111b",
        primaryLight: "#FFF7F2",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        heroBg: "url('/images/ugs-with-fam.jpg')",
        authBg: "url('/images/ugs-bg.jpg')",
        LgBg: "url('/images/lg-bg-4.png')",
      },
      fontFamily: {
        bold: "MontserratAlternates_700Bold",
        // bold: "Dosis_700Bold",
        extrabold: "MontserratAlternates_800ExtraBold",
        thick: "MontserratAlternates_900Black",
        // extrabold: "Dosis_800ExtraBold",
        semibold: "MontserratAlternates_600SemiBold",
        // semibold: "Dosis_600SemiBold",
        medium: "MontserratAlternates_500Medium",
        normal: "MontserratAlternates_400Regular",
        light: "MontserratAlternates_300Light",
        extralight: "MontserratAlternates_200ExtraLight",
        thin: "MontserratAlternates_100Thin",
        // normal: "Dosis_400Regular",
      },
    },
  },
  plugins: [],
};
