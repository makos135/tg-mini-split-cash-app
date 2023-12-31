<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import Chip from "primevue/chip";
import NewTransaction from "@/components/NewTransaction.vue";
import TransactionInfo from "@/components/TransactionInfo.vue";
import Summary from "@/components/Summary.vue";
import AppHeader from "@/components/AppHeader.vue";
import Button from "primevue/button";
import router from "@/routes";
import ProgressSpinner from "primevue/progressspinner";

const store = useStore()
const route = useRoute()

store.dispatch('fetchRooms')
const room = computed(() => store.getters.roomById(route.params.id))
let transactions = ref([]);
let loading = ref(true);

const loadTransactions = () => {
  loading.value = true;
  store.dispatch('fetchTransactions', route.params.id).then(t => {
    transactions.value = t;
    loading.value = false;
  })
}

loadTransactions();

const onNewTransaction = () => {
  loadTransactions();
}

const shareRoom = () => {
  window.open('https://t.me/share/url?url='+import.meta.env.VITE_TELEGRAM_MINI_APP_URL+'?startapp=' + room.value.id);
}

const goBack = () => {
  router.push('/');
}

</script>

<template>
  <div>

    <header v-if="room">
      <div class="wrapper">
        <Button class="!w-8 !h-8 !absolute !z-10" icon="pi pi-arrow-left" severity="secondary" rounded aria-label="Go back" @click="goBack"/>
        <AppHeader :msg="room.name"/>
      </div>
      <p class="mt-3">
        {{ room.description }}
      </p>
    </header>

    <div class="members mt-2" v-if="room">
      <div class="grid grid-cols-1 w-full justify-center">

        <div class="grid grid-cols-12 w-full justify-center">
          <div class="col-span-10 flex overflow-scroll mr-2">
            <Chip v-for="user in room.users" :label="user.name" icon="pi pi-user" class="m-1"/>
          </div>
          <div class="col-span-2 flex justify-center items-center">
            <Button class="!w-8 !h-8" icon="pi pi-send" severity="secondary" rounded aria-label="Share" @click="shareRoom"/>
          </div>
        </div>

        <div class="grid grid-cols-12 mt-2">
          <div class="col-span-5 mr-2 flex justify-center" style="width:90%">
            <NewTransaction :room="room" @created="onNewTransaction"/>
          </div>
          <div class="col-span-5 mr-2 flex justify-center" style="width:90%">
            <Summary :room="room" @created="onNewTransaction"/>
          </div>
          <div class="col-span-2 w-full flex justify-center" >
            <Button icon="pi pi-refresh"  aria-label="Refresh" @click="loadTransactions"/>
          </div>
        </div>
        <div class="w-full h-full flex content-center items-center" style="height: 50vh" v-if="loading">
          <ProgressSpinner/>
        </div>
        <div v-else class="w-full mt-2">
          <TransactionInfo v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" @onDeleted="loadTransactions"/>
          <div v-if="transactions.length===0" class="mt-5 h-full text-center">
            <span>You dont have transactions yet. Create new Split. Here you will see your transactions.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-chip .p-chip-text {
  font-size: 0.75rem;
}

.members {
  display: flex;
  flex-wrap: wrap;
}

.p-dialog {
  margin: 1.5rem;
}

.room-header h2 {
  font-weight: 500;
  font-size: 2rem;
  position: relative;
  top: -10px;

}

</style>