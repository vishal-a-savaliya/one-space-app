/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        primary: "#272727",
        secondary: "#F9FAFC",
        'white': '#ffffff',
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
  safelist: [
    'text-indigo-500',
    'bg-indigo-200',
    'text-green-500',
    'bg-green-200',
    {
      pattern: /bg-(red|green|blue|sky|indigo|violet|pink|red)-(100|200|300|500)/,
      pattern: /text-(red|green|blue|sky|indigo|violet|pink|red)-(100|200|300|500)/,
    },
  ],
}
