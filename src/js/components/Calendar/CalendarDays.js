import React from "react";
import {startOfWeek, format, addDays} from "date-fns";

/**
 * @return {*} Return date libelle of the weeks
 */
export const CalendarDays = ({currentMonth, dateLocale}) => {
  const dateFormat = "EEEE";
  const days = [];

  let startDate = startOfWeek(currentMonth, {weekStartsOn: 1});
  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col col-center" key={i}>
        {format(addDays(startDate, i), dateFormat, dateLocale)}
      </div>
    );
  }
  return <div className="days row">{days}</div>;
};

export default CalendarDays;
