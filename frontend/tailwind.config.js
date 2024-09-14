/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      text: {
        primary: "rgba(18, 18, 18, 1)",
        secondary: "rgba(18, 18, 18, 0.75)",
        hover: "rgba(18, 18, 18, 1)",
      },
      background: {
        primary: "#a16854",
        secondary: "#f3f3f3",
        hover: "",
      },
      border: {
        primary: "rgba(18, 18, 18, 1)",
        secondary: "rgba(18, 18, 18, 0.35)",
        tertiary: "rgba(18, 18, 18, 0.08)",
      },
      white: "#fff",
      black: "rgba(18, 18, 18, 1)",
      red: "#E4003A",
    },
    fontFamily: {
      SofiaBold: ['"SofiaBold"'],
    },
    extend: {
      opacity: {
        8: "0.08",
      },
      scale: {
        103: "103%",
      },
    },
  },
  plugins: [],
};
