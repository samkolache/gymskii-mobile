/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#3175B1",
        brandHover: '#256094',
        brandHeading: '#094067',
        navHover: '#6195C6',
        linkHover: '#E3F2FD',
        stats: '#1F3B4D'
      },
    },
  },
  plugins: [],
}