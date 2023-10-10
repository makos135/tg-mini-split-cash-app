import {createStore} from "vuex";
import WebApp from '@twa-dev/sdk'
import router from "@/routes";

WebApp.ready();

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
console.log(WebApp)

let TOKEN = '';

//WebApp.CloudStorage.removeItem('token');
const patchHeaders = options => {
    options.headers = {
        'Content-Type': 'application/json',
        'X-TOKEN': TOKEN
    };
    return options;
}

const tryToLinkToRoom = () => {
    const linkToRoom = WebApp.initDataUnsafe.start_param ?? null;
    if (linkToRoom) {
        fetch(API_ENDPOINT + '/rooms/link.json', patchHeaders({
            method: 'POST',
            body: JSON.stringify({room_id: linkToRoom})
        })).then(() => store.dispatch('fetchRooms').then(()=>{
            router.push('/room/' + linkToRoom);
        }));
    }
}

const fetchToken = () => {
    return new Promise((resolve, reject) => {
        if (!WebApp.initDataUnsafe.user) {
            TOKEN = 123;
            tryToLinkToRoom();
            resolve();
        }
        WebApp.CloudStorage.getItem('token', (err, token) => {
            if (!err && token) {
                TOKEN = token;
                tryToLinkToRoom();
                resolve();
            } else {
                initUser().then(json => {
                    TOKEN = json.token;
                    WebApp.CloudStorage.setItem('token', TOKEN);
                    tryToLinkToRoom();
                    resolve();
                }).catch(reject);
            }
        });
    })
}

const initUser = () => {
    return new Promise((resolve, reject) => {
        fetch(API_ENDPOINT + '/users/init.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: WebApp.initDataUnsafe.user ? WebApp.initDataUnsafe.user.id : 321,
                name: WebApp.initDataUnsafe.user ? WebApp.initDataUnsafe.user.first_name : 'DEBUG_USER'
            })
        }).then(response => response.json()).then(json => {
            //commit('setRooms', json);

            resolve(json);
        }).catch(reject);
    })
}

fetchToken();

let store = createStore({
    state() {
        return {
            rooms: [],
            telegramApi: WebApp
        }
    },
    getters: {
        rooms: (state) => {
            return state.rooms
        },
        roomById: (state) => (id) => {
            return state.rooms.find(room => parseInt(room.id) === parseInt(id));
        },
        telegramApi: (state) => {
            return state.telegramApi
        }
    },
    mutations: {
        updateRooms: (state, rooms) => {
            state.rooms = rooms;
        },
    },
    actions: {
        fetchRooms: async ({commit}) => {
            while(!TOKEN) {
                console.log('waiting for token...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            return new Promise((res, rej) => {
                fetch(API_ENDPOINT + '/rooms/all.json', patchHeaders({})).then(response => response.json()).then(json => {
                    commit('updateRooms', json);
                    res();
                }).catch(rej);
            });
        },
        createRoom: ({commit}, room) => {
            return new Promise((res, rej) => {

                fetch(API_ENDPOINT + '/rooms/add.json', patchHeaders({
                    method: 'POST',
                    body: JSON.stringify(room)
                })).then(response => response.json()).then((room) => {
                    store.dispatch('fetchRooms');
                    res(room)
                })
            });
        },
        createTransaction: ({commit}, transaction) => {
            return new Promise((res, rej) => {
                fetch(API_ENDPOINT + '/transactions/add.json', patchHeaders({
                    method: 'POST',
                    body: JSON.stringify(transaction._value)
                })).then(response => response.json()).then(() => {
                    res();
                }).catch(rej)
            })
        },
        fetchTransactions: ({commit}, roomId) => {
            return new Promise((res, rej) => {
                fetch(API_ENDPOINT + '/rooms/getTransactions/' + roomId + '.json', patchHeaders({})).then(response => response.json()).then(json => {
                    res(json);
                }).catch(err => {
                    rej(err);
                })
            })
        },
        deleteTransaction: ({commit}, transactionId) => {
            return new Promise((res, rej) => {
                fetch(API_ENDPOINT + '/transactions/delete/' + transactionId + '.json', patchHeaders({
                    method: 'DELETE',
                })).then(response => response.json()).then(json => {
                    res(json);
                }).catch(err => {
                    rej(err);
                })
            })
        },
        fetchSummary: ({commit}, roomId) => {
            return new Promise((res, rej) => {
                fetch(API_ENDPOINT + '/rooms/getSummary/' + roomId + '.json', patchHeaders({})).then(response => response.json()).then(json => {
                    res(json);
                }).catch(err => {
                    rej(err);
                });
            })
        },
    }
});

export default store;