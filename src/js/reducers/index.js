import { combineReducers } from 'redux';
import form from 'Reducers/form';
import emplacement from 'Reducers/emplacement';
import {combineEpics} from 'redux-observable';
import {formSubmitEpic} from 'Actions/form';
import {emplacementEpic} from 'Actions/emplacement';
import {comptaEpic} from 'Actions/compta';
import compta from 'Reducers/compta';

export const rootReducer = combineReducers({
    form,
    emplacement,
    compta
});

export const rootEpic = combineEpics(
    formSubmitEpic,
    emplacementEpic,
    comptaEpic
);
