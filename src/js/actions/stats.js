import {STATS_FETCH, STATS_ERROR_CLEAN, STATS_FETCH_ERROR, STATS_FETCH_SUCCESS} from 'Constants/ActionTypes';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import api from 'Services/ApiService';

export const statsEpic = action$ => action$.pipe(
    ofType(STATS_FETCH),
    mergeMap(({year, month}) =>
        from(api.stats.get({year, month})).pipe(
            map(({error, datas}) => {
                if (error) throw error;
                return {type: STATS_FETCH_SUCCESS, datasYear: datas, year, month};
            }),
            catchError(error => of(error).pipe(
                map((error) => ({type: STATS_FETCH_ERROR, error})),
                endWith({type: STATS_ERROR_CLEAN})
            ))
        )
    ),
);

export const fetchStatsOfYear = ({year, month}) => ({type: STATS_FETCH, year, month});
