import {STATS_FETCH, STATS_ERROR_CLEAN, STATS_FETCH_ERROR, STATS_FETCH_SUCCESS} from 'Constants/ActionTypes';
import config from 'Config';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError, endWith} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import processResponse from 'Utils/processResponse';

const api = {
    fetchStatsOfYear: (year, month) => fetch(`${config.engine.host}/stats/year/${year}/ca?month=${month}`)
        .then(response => processResponse(response))
        .then(value => ({value}))
        .catch(error => ({error}))
};

export const statsEpic = action$ => action$.pipe(
    ofType(STATS_FETCH),
    mergeMap(({year, month}) =>
        from(api.fetchStatsOfYear(year, month)).pipe(
            map(({error, value}) => {
                if (error) throw error;
                return {type: STATS_FETCH_SUCCESS, datasYear: value, year, month};
            }),
            catchError(error => of(error).pipe(
                map((error) => ({type: STATS_FETCH_ERROR, error})),
                endWith({type: STATS_ERROR_CLEAN})
            ))
        )
    ),
);

export const fetchStatsOfYear = ({year, month}) => ({type: STATS_FETCH, year, month});
