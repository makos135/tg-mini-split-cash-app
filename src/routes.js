import AllSplitsList from "@/components/AllSplitsList.vue";
import Room from "@/components/Room.vue";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    { path: '/:catchAll(.*)', component: AllSplitsList },
    { path: '/room/:id', component: Room },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;