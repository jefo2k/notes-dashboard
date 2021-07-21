# Notes Board client

This application allows the user to write their own notes in Markdown and save them to the back-end.

## Project setup

```shell
npm install
```

> Note: Make sure you have the back-end running before start the client.

The default url for back-end api is `http://localhost:3000/`. To change, edit the `src/config/api.js` file:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000/', // if necessary, change the default api url
  timeout: 5000
});
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Use the client

In your browser, go to [http://localhost:8080/](http://localhost:8080/) url.

### Compiles and minifies for production

```shell
npm run build
```

### Lints and fixes files

```shell
npm run lint
```
