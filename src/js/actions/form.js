import {
    FORM_SUBMIT,
    FORM_SUBMIT_SUCCESS,
    FORM_INIT,
    FORM_SUBMIT_ERROR
} from 'Constants/ActionTypes';
import {from} from 'rxjs';
import {mergeMap, map, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import config from 'Config';
import processResponse from 'Utils/processResponse';
import {catchError} from "rxjs/operators/index";
import {of} from "rxjs/index";

const api = {
    sendDatas: datas => fetch(`${config.engine.host}/compta/add/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(datas)
    })
        .then(response => processResponse(response))
        .catch(error => ({error}))
};

export const formSubmitEpic = action$ => action$.pipe(
    ofType(FORM_SUBMIT),
    mergeMap(action =>
        from(api.sendDatas(action.datas)).pipe(
            map(({error}) => {
                if (error) throw error;
                return ({type: FORM_SUBMIT_SUCCESS});
            }),
            map(action => action),
            catchError(error => of(error).pipe(
                map((error) => ({type: FORM_SUBMIT_ERROR, error})),
            )),
            endWith(({type: FORM_INIT}))
        )
    ),
);

export const sendFormDatas = (datas) => ({type: FORM_SUBMIT, datas});
