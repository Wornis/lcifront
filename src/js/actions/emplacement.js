import {EMPLACEMENT_FETCH, EMPLACEMENT_FETCH_ERROR, EMPLACEMENT_FETCH_SUCCESS, EMPLACEMENT_ERROR_CLEAN} from 'Constants/ActionTypes';
import config from 'Config';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import processResponse from 'Utils/processResponse';

const api = {
    fetchEmplacements: () => fetch(`${config.engine.host}/emplacement/`)
        .then(response => processResponse(response))
        .then(value => ({value}))
        .catch((error) => ({error}))
};

export const emplacementEpic = action$ => action$.pipe(
    ofType(EMPLACEMENT_FETCH),
    mergeMap(() =>
        from(api.fetchEmplacements()).pipe(
            map(({error, value}) => {
                if (error) throw error;
                return {type: EMPLACEMENT_FETCH_SUCCESS, emplacements: value};
            }),
            catchError(error => of(error).pipe(
                map((error) => ({type: EMPLACEMENT_FETCH_ERROR, error})),
                endWith({type: EMPLACEMENT_ERROR_CLEAN})
            ))
        )
    ),
);

export const fetchEmplacements = () => ({type: EMPLACEMENT_FETCH});
