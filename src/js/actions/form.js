import {FORM_SUBMITTED, FORM_RESPONSE_RECEIVED} from 'Constants/ActionTypes';
import {from} from 'rxjs';
import {mergeMap, map} from 'rxjs/operators';
import {ofType} from 'redux-observable';

const api = {
    sendDatas: datas => fetch('http://localhost:3002/compta/add/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(datas)
    }).then(response => response.json())
};

export const formEpic = action$ => action$.pipe(
    ofType(FORM_SUBMITTED),
    mergeMap(action =>
        from(api.sendDatas(action.datas)).pipe(
            map(response => {
                return {type: FORM_RESPONSE_RECEIVED}
            })
        )
    ),
);

export const sendFormDatas = (datas) => ({type: FORM_SUBMITTED, datas});