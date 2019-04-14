import {PING, PONG} from 'Constants/ActionTypes';
import {delay, mapTo} from 'rxjs/internal/operators/index';
import {ofType} from 'redux-observable';

export const pingEpic = action$ => action$.pipe(
    ofType(PING),
    delay(2000),
    mapTo({ type: PONG })
);
