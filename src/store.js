import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";

const initalState = {};

const middleware = { thunk };

const store = createStore(rootReducer, initalState);

export default store;
