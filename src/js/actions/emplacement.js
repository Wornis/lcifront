import {EMPLACEMENT_FETCH, EMPLACEMENT_FETCH_ERROR,
    EMPLACEMENT_FETCH_SUCCESS, EMPLACEMENT_ERROR_CLEAN
} from 'Constants/ActionTypes';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import api from 'Services/ApiService';

export const emplacementEpic = action$ => action$.pipe(
    ofType(EMPLACEMENT_FETCH),
    mergeMap(() =>
        from(api.emplacement.get()).pipe(
            map(({error, datas}) => {
                if (error) throw error;
                return {type: EMPLACEMENT_FETCH_SUCCESS, emplacements: datas};
            }),
            catchError(error => of(error).pipe(
                map((error) => ({type: EMPLACEMENT_FETCH_ERROR, error})),
                endWith({type: EMPLACEMENT_ERROR_CLEAN})
            ))
        )
    ),
);

export const fetchEmplacements = () => ({type: EMPLACEMENT_FETCH});
