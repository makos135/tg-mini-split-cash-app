import {createStore} from "vuex";
import WebApp from '@twa-dev/sdk'

WebApp.ready();

const API_ENDPOINT = 'https://3e016db81c21.ngrok.app';
console.log(WebApp)

let TOKEN = '';

const fetchToken = () => {
    return new Promise((resolve, reject) => {
        if (!WebApp.initDataUnsafe.user) {
            TOKEN = 123;
            resolve();
        }
        WebApp.CloudStorage.getItem('token', (err, token) => {
            if (!err && token) {
                TOKEN = token;
                resolve();
            } else {
                initUser().then(json => {
                    TOKEN = json.token;
                    WebApp.CloudStorage.setItem('token', TOKEN);
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

await fetchToken();
console.log(TOKEN);


const patchHeaders = options => {
    options.headers = {
        'Content-Type': 'application/json',
        'X-TOKEN': TOKEN
    };
    return options;
}

const store = createStore({
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
        fetchRooms: ({commit}) => {
            fetch(API_ENDPOINT + '/rooms/all.json', patchHeaders({})).then(response => response.json()).then(json => {
                commit('updateRooms', json);
            })
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

const linkToRoom = WebApp.initDataUnsafe.start_param ?? 3;
if (linkToRoom) {
    fetch(API_ENDPOINT + '/rooms/link.json', patchHeaders({
        method: 'POST',
        body: JSON.stringify({room_id: linkToRoom})
    })).then(() => store.dispatch('fetchRooms'));
}
export default store;