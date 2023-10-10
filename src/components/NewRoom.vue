<script setup>
import {ref, onMounted} from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import {useField, useForm} from 'vee-validate';
import {useStore} from 'vuex'
import {useToast} from "primevue/usetoast";
import Toast from "primevue/toast";

const dialogVisible = ref(false);
const {handleSubmit, resetForm} = useForm();

const store = useStore();

const toastObject = useToast();

const onSubmit = handleSubmit((values) => {
  dialogVisible.value = false;
  store.dispatch('createRoom', room).then(() => {
    toastObject.add({severity: 'success', summary: room.name, detail: 'Room has been created', life: 3000});

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
    <Toast/>
    <Button class="w-full" label="Create room" icon="pi pi-plus" @click="dialogVisible = true"/>

    <Dialog v-model:visible="dialogVisible" modal header="New room">
      <form @submit="onSubmit" class="flex flex-column gap-2 w-full">
        <div class="w-full">
          <div>
            <span class="p-float-label">Room name</span>
            <InputText class="w-full" v-model="room.name" type="text" maxlength="55"/>
          </div>
          <div>
            <span class="p-float-label">Currency</span>
            <InputText class="w-full" v-model="room.currency" type="text" maxlength="3"/>
          </div>
          <div>
            <span class="p-float-label"> Description</span>
            <InputText class="w-full" v-model="room.description" type="text" label="Description" maxlength="255"/>
          </div>
          <div class="mt-5">
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

</style>