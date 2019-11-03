import {getYear, getMonth} from 'date-fns';
import {CALENDAR_GET_EVENTS_SUCCESS} from "Constants/ActionTypes";

const initialState = {events: []};

const handleEvents = (events, year) => {
  const myEvents = {[year]: []};
  events.forEach(event => {
    const selectedDate = new Date(event.date);
    const year = getYear(selectedDate);
    const month = getMonth(selectedDate) + 1;
    if (!myEvents[year])
      myEvents[year] = {};
    if (!myEvents[year][month])
      myEvents[year][month] = [];
    myEvents[year][month].push(event);
  });
  return myEvents;
};


const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALENDAR_GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: {
          ...state.events,
          ...handleEvents(action.events, action.year)
        }
      };
    default:
      return state;
  }
};

export default calendarReducer;
