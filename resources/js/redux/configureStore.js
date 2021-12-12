import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from "./Reducers/combineReducers";

export default createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))
