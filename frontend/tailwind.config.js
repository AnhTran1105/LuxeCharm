/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "color-foreground": "rgb(18,18,18)",
    },
    extend: {
      opacity: {
        8: "0.08",
      },
    },
  },
  plugins: [],
};
