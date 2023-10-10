<script setup>

import Menu from "primevue/menu";
import Button from "primevue/button";
import {ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import Toast from "primevue/toast";

const props = defineProps({
  transaction: Object
})

const transaction = props.transaction;
const store = useStore()
const toastElement = useToast();
const menu = ref();
const speedDialItems = ref([
  {
    label: 'Delete',
    icon: 'pi pi-times',
    command: () => {
      store.dispatch('deleteTransaction', transaction.id).then(() => {
        toastElement.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
      }).catch(error => {
        toastElement.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
      })
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
        <Toast />
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