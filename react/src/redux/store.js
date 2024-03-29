import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  rootReducer,
  // applyMiddleware(thunk),
  composeEnhancer(applyMiddleware(thunk))
);
createStore(rootReducer);
