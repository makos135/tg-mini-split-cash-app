<script setup>
import {ref, defineEmits} from "vue";
import {useStore} from "vuex";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const dialogVisible = ref(false);
const store = useStore();
const props = defineProps({
  room: Object
})

const room = props.room;
const summaries = ref([]);

const showDialog = () => {
  store.dispatch('fetchSummary', room.id).then((response) => {
    summaries.value = response;
  });
  dialogVisible.value = true
}
</script>

<template>
  <div>
    <Button class="" label="Summary" icon="pi pi-info-circle" @click="showDialog"/>

    <Dialog v-model:visible="dialogVisible" modal header="Summary" class="!w-full">
      <div v-for="(summary, k) in summaries" :key="k" class="w-full">
        <div class="grid grid-cols-12 w-full mt-4 border border-solid border-white rounded p-3">
          <div class="col-span-10">
            <div>
              From: {{ summary.from.name }}
            </div>
            <div>
              To: {{ summary.to.name }}
            </div>
          </div>
          <div class="col-span-2">
            <div>
              Value: {{ summary.value }}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
 span {
  margin-top: 10px;
}

</style>