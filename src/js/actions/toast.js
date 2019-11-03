import {mapTo} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {TOAST_ERROR, TOAST_SUCCESS, TOAST_CLEAN} from "Constants/ActionTypes";

export const cleanToastEpic = action$ => action$.pipe(
  ofType(TOAST_SUCCESS, TOAST_ERROR),
  mapTo({type: TOAST_CLEAN})
);
