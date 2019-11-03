import { combineReducers } from 'redux';
import form from 'Reducers/form';
import emplacement from 'Reducers/emplacement';
import {combineEpics} from 'redux-observable';
import {formSubmitEpic} from 'Actions/form';
import {emplacementEpic} from 'Actions/emplacement';
import {comptaEpic} from 'Actions/compta';
import compta from 'Reducers/compta';
import stats from "Reducers/stats";
import {statsEpic} from "Actions/stats";
import calendar from "Reducers/calendar";
import {CalendarAddEventEpic} from "Actions/calendar";
import toast from "Reducers/toast";

export const rootReducer = combineReducers({
  form,
  emplacement,
  compta,
  stats,
  calendar,
  toast
});

export const rootEpic = combineEpics(
  formSubmitEpic,
  emplacementEpic,
  comptaEpic,
  statsEpic,
  CalendarAddEventEpic
);
