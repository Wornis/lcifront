import React from "react";
import {format, addMonths, subMonths} from 'date-fns';

const CalendarHeader = ({currentMonth, dateLocale, onChangeMonth}) => {
  const nextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    onChangeMonth(nextMonth);
  };

  const prevMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    onChangeMonth(prevMonth);
  };

  const dateFormat = "MMMM yyyy";
  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={prevMonth}>
          &lt;&lt;&lt;&lt;&lt;
        </div>
      </div>
      <div className="col col-center">
        <span>{format(currentMonth, dateFormat, dateLocale)}</span>
      </div>
      <div className="col col-end" onClick={nextMonth}>
        <div className="icon">&gt;&gt;&gt;&gt;&gt;</div>
      </div>
    </div>
  );
};

export default CalendarHeader;