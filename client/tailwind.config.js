/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "komatsu-blue": "#0e1171",
        "komatsu-gray": "#ebebeb",
        "komatsu-blue-light": "#0077a6",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
