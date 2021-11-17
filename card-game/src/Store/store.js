import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducers/reducer";
import thunk from 'redux-thunk'

export const store = createStore(reducer, compose(applyMiddleware(thunk)));