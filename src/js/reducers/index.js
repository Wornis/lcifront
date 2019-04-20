import { combineReducers } from 'redux';
import form from 'Reducers/form';
import {combineEpics} from 'redux-observable';
import {formEpic} from 'Actions/form';

export const rootReducer = combineReducers({
    form
});

export const rootEpic = combineEpics(
    formEpic,
);
