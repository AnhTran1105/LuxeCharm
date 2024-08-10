/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "color-foreground": "rgb(18,18,18)",
      hover: "#a16854",
      "badge-background": "rgb(236,218,218)",
      white: "#fff",
    },
    extend: {
      opacity: {
        8: "0.08",
      },
      textUnderlineOffset: {
        "3.5px": "3.5px",
      },
    },
  },
  plugins: [],
};
