<script setup>
import {useStore} from "vuex";

const store = useStore();

let colors = {
  bg_color: "#181819",
  secondary_bg_color: "#000000",
  text_color: "#ffffff",
  hint_color: "#7d7d7d",
  link_color: "#7590e2",
  button_color: "#738fed",
  button_text_color: "#ffffff"
}
const setColors = (themeParams) => {
  document.documentElement.style.setProperty('--bg-color', themeParams.bg_color);
  document.documentElement.style.setProperty('--secondary-bg-color', themeParams.secondary_bg_color);
  document.documentElement.style.setProperty('--text-color', themeParams.text_color);
  document.documentElement.style.setProperty('--hint-color', themeParams.hint_color);
  document.documentElement.style.setProperty('--link-color', themeParams.link_color);
  document.documentElement.style.setProperty('--button-color', themeParams.button_color);
  document.documentElement.style.setProperty('--button-text-color', themeParams.button_text_color);
  document.documentElement.style.setProperty('--button-transparent-color', themeParams.button_color + '7a');
  console.log(colors);
}

setColors(store.state.telegramApi.initDataUnsafe.user ?store.state.telegramApi.themeParams : colors);
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>