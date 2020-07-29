import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import pokeReducer from "./reducers/pokeReducer";
import api from './Api';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const pokeStore = createStore(
  pokeReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
);
