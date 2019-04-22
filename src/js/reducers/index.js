import { combineReducers } from 'redux';
import form from 'Reducers/form';
import emplacement from 'Reducers/emplacement'
import {combineEpics} from 'redux-observable';
import {formSubmitEpic} from 'Actions/form';
import {emplacementEpic} from "Actions/emplacement";

export const rootReducer = combineReducers({
    form,
    emplacement
});

export const rootEpic = combineEpics(
    formSubmitEpic,
    emplacementEpic
);
