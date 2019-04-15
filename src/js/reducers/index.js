import { combineReducers } from 'redux';
import ping from './ping.js';
import {combineEpics} from 'redux-observable';
import {pingEpic} from 'Actions/ping';

export const rootReducer = combineReducers({
    ping
});

export const rootEpic = combineEpics(
    pingEpic
);
