<script setup>
import SplitListItem from '../components/SplitListItem.vue'
import NewRoom from "@/components/NewRoom.vue";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import AppHeader from "@/components/AppHeader.vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

const store = useStore()
let loading = ref(true);
store.dispatch('fetchRooms').then(() => {
  loading.value = false;
});
const rooms = computed(() => store.state.rooms);
const refresh = () => {
  loading.value = true;
  store.dispatch('fetchRooms').then(() => {
    loading.value = false;
  })
}

</script>

<template>
  <div>

    <header>
      <div class="wrapper">
        <AppHeader msg="Select or create room"/>
      </div>
    </header>

    <div class="grid grid-cols-12 w-full mt-5">
      <div class="col-span-10 w-full">
        <NewRoom/>
      </div>
      <div class="col-span-2 flex justify-center items-center">
        <Button icon="pi pi-refresh"  aria-label="Share" @click="refresh"/>
      </div>
    </div>

    <div class="w-full h-full flex content-center items-center" style="height: 50vh" v-if="loading">
      <ProgressSpinner/>
    </div>
    <div v-else>
      <SplitListItem v-for="room in rooms" :key="room.id" :room="room"/>
    </div>

  </div>

</template>
