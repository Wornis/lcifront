import {from} from 'rxjs';
import {mergeMap, map, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {catchError} from "rxjs/operators/index";
import {of} from "rxjs/index";
import api from 'Services/ApiService';
import {
  FORM_SUBMIT, FORM_SUBMIT_SUCCESS, FORM_INIT,
  FORM_SUBMIT_ERROR, TOAST_SUCCESS, TOAST_ERROR
} from 'Constants/ActionTypes';

export const formSubmitEpic = action$ => action$.pipe(
  ofType(FORM_SUBMIT),
  mergeMap(action =>
    from(api.form.post(action.datas)).pipe(
      map(({error}) => {
        if (error) throw error;
        return ({type: FORM_SUBMIT_SUCCESS});
      }),
      endWith(({type: TOAST_SUCCESS, msg: '🚀 Données ajoutées.'})),
      catchError(error => of(error).pipe(
        map((error) => ({type: FORM_SUBMIT_ERROR, error})),
        map(({error}) => ({type: TOAST_ERROR, msg: `❌ ${error}`}))
      )),
      endWith(({type: FORM_INIT}))
    )
  ),
);

export const sendFormDatas = (datas) => ({type: FORM_SUBMIT, datas});
