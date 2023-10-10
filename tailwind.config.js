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
      dark: '#000',
      primary: 'var(--color-primary)',
      background_color: 'var(--bg-color)',
      secondary_bg_color: 'var(--secondary-bg-color)',
      text_color: 'var(--text-color)',
      hint_color: 'var(--hint-color)',
      link_color: 'var(--link-color)',
      button_color: 'var(--button-color)',
      button_text_color: 'var(--button-text-color)',
      button_transparent_color: 'var(--button-transparent-color)'
    },

  },
  plugins: [],

}

