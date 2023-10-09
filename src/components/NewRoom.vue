<script setup>
import {ref, onMounted} from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import {useField, useForm} from 'vee-validate';
import {useStore} from 'vuex'
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const dialogVisible = ref(false);
const {handleSubmit, resetForm} = useForm();

const store = useStore();

const toastObject = useToast();

const onSubmit = handleSubmit((values) => {
  dialogVisible.value = false;
  store.dispatch('createRoom', room).then(() => {
    toastObject.add({ severity: 'success', summary: room.name, detail: 'Room has been created', life: 3000 });

  });
})

let room = {
  name: "",
  description: "",
  currency: "USD"
}
</script>


<template>
  <div>
    <Toast />
    <Button class="w-full" label="Create room" icon="pi pi-plus" @click="dialogVisible = true"/>

    <Dialog v-model:visible="dialogVisible" modal header="New room">
      <form @submit="onSubmit" class="flex flex-column gap-2">
        <div>
          <div>
            <span class="p-float-label"> Room name</span>
            <InputText v-model="room.name" type="text" maxlength="55"/>
          </div>
          <div>
            <span class="p-float-label">Currency</span>
            <InputText v-model="room.currency" type="text" maxlength="3"/>
          </div>
          <div>
            <span class="p-float-label"> Description</span>
            <InputText v-model="room.description" type="text" label="Description" maxlength="255"/>
          </div>
          <div>
            <Button class="w-full" type="submit" label="Create"/>
          </div>
        </div>

      </form>
    </Dialog>
  </div>
</template>

<style scoped>
span {
  margin-top: 20px
}

button {
  margin-top: 10px;
}
</style>