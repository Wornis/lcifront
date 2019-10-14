import {STATS_FETCH, STATS_ERROR_CLEAN, STATS_FETCH_ERROR, STATS_FETCH_SUCCESS} from 'Constants/ActionTypes';
import config from 'Config';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import processResponse from 'Utils/processResponse';

const api = {
    fetchStatsOfYear: (year) => fetch(`${config.engine.host}/stats/year/${year}/ca`)
        .then(response => processResponse(response))
        .then(value => ({value}))
        .catch(error => ({error}))
};

export const statsEpic = action$ => action$.pipe(
    ofType(STATS_FETCH),
    mergeMap(({year}) =>
        from(api.fetchStatsOfYear(year)).pipe(
            map(({error, value}) => {
                if (error) throw error;
                return {type: STATS_FETCH_SUCCESS, datasYear: value};
            }),
            catchError(error => of(error).pipe(
                map((error) => ({type: STATS_FETCH_ERROR, error})),
                endWith({type: STATS_ERROR_CLEAN})
            ))
        )
    ),
);

export const fetchStatsOfYear = (year) => ({type: STATS_FETCH, year});
