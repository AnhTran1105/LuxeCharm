/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "color-foreground": "rgb(18,18,18)",
      hover: "#a16854",
      "badge-background": "rgb(236,218,218)",
      white: "#fff",
      black: "#121212",
      red: "#E4003A",
      background: "rgb(243, 243, 243)",
      foreground75: "rgba(18, 18, 18, 0.75)",
      "no-color": "rgb(0, 0, 0, 0)",
      primary: "rgb(161, 104, 84)",
      second: "#6B6D76",
      third: "#eaeaea",
    },
    fontFamily: {
      Sofia: ['"Sofia'],
      SofiaBold: ['"SofiaBold"'],
    },
    extend: {
      opacity: {
        8: "0.08",
      },
      textUnderlineOffset: {
        "3px": "3px",
      },
      scale: {
        103: "103%",
      },
    },
  },
  plugins: [],
};
