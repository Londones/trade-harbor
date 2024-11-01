/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textStroke: {
        2: "2px black",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-stroke-2": {
          "-webkit-text-stroke": "5px",
        },
        ".text-stroke-black": {
          "-webkit-text-stroke-color": "black",
        },
        ".paint-order-fill": {
          "paint-order": "stroke fill",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
