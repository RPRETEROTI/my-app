// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as Posts } from "../Stores/Post/Reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as Counter } from "../Stores/Counter/Reducers";
import { combineReducers, applyMiddleware } from "redux";
import { compose, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import thunk from "redux-thunk";
import rootSaga from "../Sagas/posts";
const rootReducer = combineReducers({ Posts, Counter });
// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

// const composeEnhancers = composeWithDevTools({
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     // Specify name here, actionsBlacklist, actionsCreators and other options if needed
//   });
const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
//saga steps
const sagaMiddleWare=createSagaMiddleware()

// const enhancer = composeEnhancers(applyMiddleware(thunk));
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleWare));

//persistedstore
// primo step scelgo i riduttori da persistere
const persistConfig={
  key:'root',
  storage:storage,
  blackList:['Posts']
  }
  const persistedStore=persistReducer(persistConfig,rootReducer)
  const store = createStore(persistedStore, enhancer);
  // secondo step:creo store persistente

  const persiststore=persistStore(store)
  persistStore(store).purge().then(response => console.log(response))

  // store no persistente
// const store = createStore(rootReducer, enhancer);
sagaMiddleWare.run(rootSaga)
console.log("store", store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type PersistedState = ReturnType<typeof persiststore.getState>;

export  {persiststore,store};

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
