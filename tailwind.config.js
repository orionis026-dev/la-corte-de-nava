/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nava: {
          gold: '#FFD700',
          electric: '#00D4FF',
        },
        seshat: {
          papyrus: '#F5E6C8',
          turquoise: '#40E0D0',
        },
        ptah: {
          obsidian: '#1A1A2E',
          copper: '#B87333',
        },
        tavily: {
          amber: '#FFBF00',
          white: '#FFFFFF',
        },
        jcodemunch: {
          emerald: '#50C878',
          violet: '#8A2BE2',
        },
      },
      fontFamily: {
        hieroglyph: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
