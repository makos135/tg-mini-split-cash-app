<script setup>
import SplitListItem from '../components/SplitListItem.vue'
import NewRoom from "@/components/NewRoom.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import AppHeader from "@/components/AppHeader.vue";


function validateRoomName(value) {
  if (!value) {
    return 'Name - Surname is required.';
  }

  return true;
}
const store = useStore()
store.dispatch('fetchRooms');
const rooms = computed(() => store.state.rooms);

</script>

<template>
  <div>

    <header>
      <div class="wrapper">
        <AppHeader msg="Select or create room" />
      </div>
    </header>
    <div>
      <NewRoom/>
    </div>
      <SplitListItem  v-for="room in rooms" :key="room.id" :room="room"/>

  </div>

</template>
