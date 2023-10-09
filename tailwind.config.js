import {TRANSITIONS} from "primevue/passthrough/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#456f49'
    },

  },
  plugins: [],

}

