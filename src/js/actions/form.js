import {FORM_SUBMITTED, FORM_RESPONSE_RECEIVED, FORM_CLEAR} from 'Constants/ActionTypes';
import {from} from 'rxjs';
import {mergeMap, map, delay, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';

const api = {
    sendDatas: datas => fetch('http://localhost:3002/compta/add/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(datas)
    })
        .then(response => ({status: response.status}))
        .catch(() => ({status: 500, error: 'Impossible d\' inserer les donnees'}))
};

export const formEpic = action$ => action$.pipe(
    ofType(FORM_SUBMITTED),
    mergeMap(action =>
        from(api.sendDatas(action.datas)).pipe(
            delay(1000), // Avoid re-click on validation button
            map(({status, error}) => ({type: FORM_RESPONSE_RECEIVED, status, error})),
            endWith(({type: FORM_CLEAR}))
        )
    ),
);

export const sendFormDatas = (datas) => ({type: FORM_SUBMITTED, datas});