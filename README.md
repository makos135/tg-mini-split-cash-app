# mini-cash-app

Mini app for Telegram Mini App Contest. Application allow to split bills between users.

How it works:

1) User open mini app and can create new "Room" or select existing one. After creation or selecting user see "Room" page.
2) On "Room" page user can invite another users to split bills with them.
3) On room page user can add "Splits" (Transactions) and split them between selected users
4) On room page user see all "Splits" and able to remove them.
5) On room page user can click "Summary" button and check how much money users should send to each other.

## Documentation

### Tools

Mini app created using [Vue.js](https://vuejs.org/) as frontend framework and [CakePHP 5 for backend](https://github.com/makos135/tg-mini-split-cash-app-back)
[PrimeVue](https://primevue.org/) is used as components library.

### Description

This documentation contains general information about developing Telegram Mini App using VueJs and PrimeVue. Without diving into application logic.
This project show how to interact with some of [twa-dev/SDK](https://github.com/twa-dev/SDK) properties like user information, Telegram client theme colors, saving and accessing data in CloudStorage.
For easy testing there are defined some variables that are used if we do not used telegram client to launch mini app!.

### General
To work with telegram api used [twa-dev/SDK](https://github.com/twa-dev/SDK). It allows to easy access to Telegram properties such as user information, user color palette and to interact with native Telegram application.

twa-dev/SDK gives access to `WebApp` object which is stored in [Vuex](https://vuex.vuejs.org/) store `src/store/store.js`, to easy access to object in components.
`src/store/store.js` also implements API communication with backend.

To save data in CloudStorage:

```WebApp.CloudStorage.setItem('token', TOKEN);```

To access data 

```WebApp.CloudStorage.getItem('token', (err, token) => { });```

getItem method has callback function as second parameter where we can access data (or got error)

When user open application first time application sends information about user to backend, save user information in database and return token for next user authentication. This token is stored in `WebApp.CloudStorage` for latter usage. (This is not the best solution of authentication as token is not refreshed, this should be changed letter).
With each API call we send `X-TOKEN` in headers for user authentication.

To get user information ```WebApp.initDataUnsafe.user``` property.

`src/main.js` entry point of application. Here we initialize VueJs application and used components.

`src/Home.vue` is a Main component of application. In this component we use [Vue Router](https://router.vuejs.org/) to easy navigation between application pages. Also in this component we set app css variable according to user Telegram application colors.

### Styling
Telegram application colors are fetched from `WebApp.themeParams`. This object has properties like `bg_color`, `secondary_bg_color`, `text_color`, `hint_color`, `link_color`, `button_color`, `button_text_color` which are saved as css variables and used in this project. Basing on these colors we can easily create new ones in same color palette with adding some opacity to these colors.
PrimeVue allow as to use [Tailwind](https://tailwindcss.com/) css framework for styling components.


Primary colors should be defined in `tailwind.config.js` to use them in project.
In this project used custom styles for some PrimeVue components.

For that `src/tailwind-custom.js` was created to separate styles setting from other logic. This configuration is imported in `src/main.js` and used as option to PrimeVue initialisation `.use(PrimeVue, { pt: CustomTailwind })`
More about styling you can find in [PrimeVue Tailwind documentation](https://primevue.org/tailwind/)

### Routing
For navigation between application pages Vue Router is used.
Routes are configured in `src/routes.js` this application has simple route for two pages

```
const routes = [
    { path: '/:catchAll(.*)', component: AllSplitsList },
    { path: '/room/:id', component: Room },
]
```

Every path that is not `room/:id` redirects to main page with selecting or creating "Rooms"

### Summary
Using VueJs and VuePrime components allow us to easy and fast application developing

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```



