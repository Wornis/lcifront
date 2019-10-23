import {COMPTA_FETCH, COMPTA_FETCH_SUCCESS,
    COMPTA_FETCH_ERROR, COMPTA_ERROR_CLEAN
} from 'Constants/ActionTypes';
import config from 'Config';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import processResponse from 'Utils/processResponse';

const api = {
    fetchCompta: ({month, year}) => fetch(`${config.engine.host}/compta/${month}&${year}`)
        .then(response => processResponse(response))
        .then(value => ({value}))
        .catch(error => ({error}))
};

export const comptaEpic = action$ => action$.pipe(
    ofType(COMPTA_FETCH),
    mergeMap(({month, year}) =>
        from(api.fetchCompta({month, year})).pipe(
            map(({error, value}) => {
                if (error) throw error;
                return {type: COMPTA_FETCH_SUCCESS, datas: value};
            }),
            catchError(error => of(error).pipe(
                map((error) => ({type: COMPTA_FETCH_ERROR, error})),
                endWith({type: COMPTA_ERROR_CLEAN})
            )),
        )
    )
);

export const fetchComptaDatas = ({month, year}) => ({type: COMPTA_FETCH, month, year});
