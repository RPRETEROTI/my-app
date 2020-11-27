import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { store } from './app/store1';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import {store,persiststore} from "./app/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persiststore}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
