import {FORM_SUBMITTED, FORM_RESPONSE_RECEIVED, FORM_INIT} from 'Constants/ActionTypes';
import {from} from 'rxjs';
import {mergeMap, map, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import config from 'Config';

const api = {
    sendDatas: datas => fetch(`${config.engine.host}/compta/add/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(datas)
    })
        .then(response => ({status: response.status}))
        .catch(() => ({status: 500, error: 'Impossible d\' inserer les donnees !'}))
};

export const formSubmitEpic = action$ => action$.pipe(
    ofType(FORM_SUBMITTED),
    mergeMap(action =>
        from(api.sendDatas(action.datas)).pipe(
            map(({status, error}) => ({type: FORM_RESPONSE_RECEIVED, status, error})),
            endWith(({type: FORM_INIT}))
        )
    ),
);

export const sendFormDatas = (datas) => ({type: FORM_SUBMITTED, datas});