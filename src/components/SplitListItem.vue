<script setup>
import Card from 'primevue/card';
import Chip from 'primevue/chip';


const props = defineProps({
  room: Object
})

const room = props.room;

</script>

<template>
  <div class="split-list-item">
    <router-link :to="'/room/'+room.id">
      <Card>
        <template #title> {{ room.name }}</template>
        <template #content>
          <div class="members">
            <Chip v-for="user in room.users" :key="user.id" :label="user.name" icon="pi pi-user"/>
          </div>
        </template>
      </Card>
    </router-link>
  </div>
</template>

<style>

.p-card-body {
  padding: 0.5rem 1.25rem !important;
}

.p-card .p-card-content {
  padding: 0.5rem 0;

}

.p-card {
  outline-style:none;
}

.p-chip .p-chip-text {
  font-size: 0.75rem;
}


.members {
  display: flex;
  overflow: scroll;
}

.members::-webkit-scrollbar {
  display: none;
}

.members > div {
  margin-right: 0.5rem;
}

.p-card-title {
  margin-bottom: 0;
}

.split-list-item {
  margin-top: 1rem;
}
</style>


