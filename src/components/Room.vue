<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import Chip from "primevue/chip";
import NewTransaction from "@/components/NewTransaction.vue";
import TransactionInfo from "@/components/TransactionInfo.vue";
import Summary from "@/components/Summary.vue";
import AppHeader from "@/components/AppHeader.vue";

const store = useStore()
const route = useRoute()

store.dispatch('fetchRooms')
const room = computed(() => store.getters.roomById(route.params.id))
let transactions = ref([]);

const loadTransactions = () => {
  console.log('try to fetch')
  store.dispatch('fetchTransactions', route.params.id).then(t => {
    transactions.value = t;
  })
}

loadTransactions();

const onNewTransaction = () => {
  loadTransactions();
}


</script>

<template>
  <div>

    <header>
      <div class="wrapper">
        <AppHeader :msg="room.name" />
      </div>
      <p>
        {{ room.description }}
      </p>
    </header>

    <div class="members mt-2" v-if="room">
      <div class="grid grid-cols-1 w-full justify-center">

        <div class="flex overflow-scroll">
          <Chip v-for="user in room.users" :label="user.name" icon="pi pi-user" class="m-1"/>
        </div>

        <div class="grid grid-cols-2">
          <div class="w-full m-1 flex justify-center">
            <NewTransaction :room="room" @created="onNewTransaction"/>
          </div>
          <div class="w-full m-1 flex justify-center">
            <Summary :room="room" @created="onNewTransaction"/>
          </div>
        </div>
        <div class="w-full mt-10">
          <TransactionInfo v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"/>
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