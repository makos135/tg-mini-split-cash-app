<script setup>
import {ref, defineEmits} from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import {useField, useForm} from 'vee-validate';
import {useStore} from 'vuex'
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';
import ProgressSpinner from "primevue/progressspinner";

const dialogVisible = ref(false);
const {handleSubmit, resetForm} = useForm();


const store = useStore();
const emit = defineEmits(['created']);
const props = defineProps({
  room: Object
})


const room = props.room;
let loading = ref(false);
let users = room.users.map(user => {
  return {id: user.id, name: user.name, value: 0}
});
let transaction = ref({
  room_id: room.id,
  description: '',
  users: [],
  by_user: 0,
  full_price: ''
});
let selectedUsers = ref([]);

function onChange() {
  transaction.value.users = selectedUsers.value.map(user => {
    user.value = transaction.value.full_price / selectedUsers.value.length;
    return user;
  });
}

const onSubmit = handleSubmit((values) => {
  loading.value = true;
  store.dispatch('createTransaction', transaction).then(() => {
    emit('created');
    loading.value = false;
    dialogVisible.value = false;
  })
})

</script>

<template>
  <div>
    <Button label="New split" icon="pi pi-plus-circle" @click="dialogVisible = true"/>

    <Dialog v-model:visible="dialogVisible" modal header="New payment">
      <div class="w-full h-full flex content-center items-center" style="height: 50vh" v-if="loading">
        <ProgressSpinner/>
      </div>
      <div v-else>
        <form @submit="onSubmit" class="flex flex-column gap-2">
          <div>
            <div class="p-inputgroup flex-col">
              <span class="p-float-label-content">Paid by</span>
              <Dropdown v-model="transaction.by_user" :options="users" optionLabel="name"
                        placeholder="Select who pay" class="w-full md:w-14rem"/>

            </div>

            <div class="mt-3">
              <span class="p-float-label-content !mt-0">Amount</span>
              <div class="p-inputgroup !mt-0">
                <InputText class="w-full" v-model="transaction.full_price" placeholder="Ammount"
                             @change="onChange($event)" type="number"/>
                <span class="p-inputgroup-addon">{{ room.currency }}</span>
              </div>
            </div>
            <div class="p-inputgroup flex-col">
              <span class="p-float-label-content">For users</span>
              <MultiSelect v-model="selectedUsers" :options="users" filter optionLabel="name"
                           placeholder="Select for users"
                           class="w-full md:w-20rem" @change="onChange($event)"/>
            </div>
            <div v-for="user in transaction.users" :key="user.id">
            <span class="p-float-label mt-3">
              <span class="p-float-label-content">Amount for: {{ user.name }}</span>
               <div class="p-inputgroup !mt-0">
                <InputText :id="'user-'+user.id" v-model="user.value" type="number"/>
                 <span class="p-inputgroup-addon">{{ room.currency }}</span>
               </div>
            </span>
            </div>
            <div class="p-inputgroup flex-col">
              <span class="p-float-label-content">Description</span>
              <InputText v-model="transaction.description" type="text"/>
            </div>

            <Button class="w-full !mt-5" type="submit" label="Create"/>
          </div>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.p-inputgroup {
  margin-top: 10px;
}

.p-dropdown, .p-multiselect, .p-inputtext {
  width: 100% !important;
}
</style>