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

const dialogVisible = ref(false);
const {handleSubmit, resetForm} = useForm();


const store = useStore();
const emit = defineEmits(['created']);
const props = defineProps({
  room: Object
})


const room = props.room;
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
console.log(transaction);
let selectedUsers = ref([]);
console.log(transaction);

function onChange() {
  transaction.value.users = selectedUsers.value.map(user => {
    user.value = transaction.value.full_price / selectedUsers.value.length;
    return user;
  });
}

const onSubmit = handleSubmit((values) => {
  store.dispatch('createTransaction', transaction).then(() => {
    emit('created');
    dialogVisible.value = false;
  })
})

</script>

<template>
  <div>
    <Button class="m-1" label="New split" icon="pi pi-plus-circle" @click="dialogVisible = true"/>

    <Dialog v-model:visible="dialogVisible" modal header="New payment">
      <form @submit="onSubmit" class="flex flex-column gap-2">
        <div>
          <div class="p-inputgroup flex-col">
            <span class="p-float-label-content">Paid by</span>
            <Dropdown v-model="transaction.by_user" :options="users" optionLabel="name"
                      placeholder="Select who pay" class="w-full md:w-14rem"/>

          </div>
          <span class="p-float-label-content">Amount</span>
          <div class="p-inputgroup">
            <InputText v-model="transaction.full_price" placeholder="Description"
                       @change="onChange($event)"/>
            <span class="p-inputgroup-addon">{{room.currency}}</span>
          </div>
          <div class="p-inputgroup flex-col">
            <span class="p-float-label-content">For users</span>
            <MultiSelect v-model="selectedUsers" :options="users" filter optionLabel="name"
                         placeholder="Select for users"
                         class="w-full md:w-20rem" @change="onChange($event)"/>
          </div>
          <div v-for="user in transaction.users" :key="user.id">
            <span class="p-float-label">
              <span class="p-float-label-content">{{ user.name }}</span>
                <InputText :id="'user-'+user.id" v-model="user.value" type="number"/>
            </span>
          </div>
          <div class="p-inputgroup flex-col">
            <span class="p-float-label-content">Description</span>
            <InputText v-model="transaction.description" type="text"/>
          </div>

          <Button type="submit" label="Create"/>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped>
button, .p-inputgroup {
margin-top: 10px;
}

.p-dropdown, .p-multiselect, .p-inputtext {
  width: 100% !important;
}
</style>