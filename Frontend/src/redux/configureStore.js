import { Memes } from './memes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            memes: Memes,
        }),
        //middleware to keep watch at state memes
        applyMiddleware(thunk, logger)
    );
    return store;
}