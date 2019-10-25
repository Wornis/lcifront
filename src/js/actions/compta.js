import {COMPTA_FETCH, COMPTA_FETCH_SUCCESS,
    COMPTA_FETCH_ERROR, COMPTA_ERROR_CLEAN
} from 'Constants/ActionTypes';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import api from 'Services/ApiService';

export const comptaEpic = action$ => action$.pipe(
    ofType(COMPTA_FETCH),
    mergeMap(({month, year}) =>
        from(api.compta.get({month, year})).pipe(
            map(({error, datas}) => {
                if (error) throw error;
                return {type: COMPTA_FETCH_SUCCESS, datas};
            }),
            catchError(error => of(error).pipe(
                map((error) => ({type: COMPTA_FETCH_ERROR, error})),
                endWith({type: COMPTA_ERROR_CLEAN})
            )),
        )
    )
);

export const fetchComptaDatas = ({month, year}) => ({type: COMPTA_FETCH, month, year});
