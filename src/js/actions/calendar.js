import {from, of} from 'rxjs';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import api from 'Services/ApiService';
import {
  CALENDAR_ADD_EVENT, CALENDAR_ADD_EVENT_SUCCESS, CALENDAR_GET_EVENTS, CALENDAR_GET_EVENTS_SUCCESS, TOAST_ERROR
} from 'Constants/ActionTypes';

export const CalendarAddEventEpic = action$ => action$.pipe(
  ofType(CALENDAR_ADD_EVENT),
  mergeMap(action =>
    from(api.calendar.post(action.datas)).pipe(
      map(({error}) => {
        if (error) throw error;
        return ({type: CALENDAR_ADD_EVENT_SUCCESS});
      }),
      map(action => action),
      catchError(error => of(error).pipe(
        map((error) => ({type: TOAST_ERROR, msg:error}))
      ))
    )
  ),
);

export const CalendarGetEventsEpic = action$ => action$.pipe(
  ofType(CALENDAR_GET_EVENTS),
  mergeMap(({year}) =>
    from(api.calendar.get(year)).pipe(
      map(({datas, error}) => {
        if (error) throw error;
        return ({type: CALENDAR_GET_EVENTS_SUCCESS, events: datas, year});
      }),
      map(action => action),
      catchError(error => of(error).pipe(
        map((error) => ({type: TOAST_ERROR, msg:error}))
      ))
    )
  ),
);

export const addNewEvent = datas => ({type: CALENDAR_ADD_EVENT, datas});
export const getEvents = year => ({type: CALENDAR_GET_EVENTS, year});
