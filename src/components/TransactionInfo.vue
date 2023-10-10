<script setup>

import Menu from "primevue/menu";
import Button from "primevue/button";
import {defineEmits, ref} from "vue";
import {useStore} from "vuex";

const props = defineProps({
  transaction: Object
})

const emit = defineEmits(['onDeleted']);

const transaction = props.transaction;
const store = useStore()
const menu = ref();
const speedDialItems = ref([
  {
    label: 'Delete',
    icon: 'pi pi-times',
    command: () => {
      store.dispatch('deleteTransaction', transaction.id).then(() => {emit('onDeleted')});
    }
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="grid grid-cols-12 w-full mt-1  rounded p-3 justify-between bg-secondary_bg_color">
    <div class="col-span-8">
      <div>
        <span> By: {{ transaction.by_user.name }} </span>
      </div>
      <div>
        <span> For: {{ transaction.for_user.name }} </span>
      </div>
    </div>
    <div class="col-span-2 flex items-center">
      {{ transaction.value }} {{transaction.currency }}
    </div>
    <div class="col-span-2 flex justify-end">
      <div class="card flex justify-content-center">
        <Button class="!w-6" type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="speedDialItems" :popup="true" />

      </div>
    </div>
  </div>
</template>

<style>

.p-speeddial-button.p-button.p-button-icon-only {
  width: 2rem;
  height: 2rem;
}

</style>