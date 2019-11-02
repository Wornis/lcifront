import React from "react";
import {
  endOfMonth, endOfWeek, startOfMonth, startOfWeek,
  isSameDay, format, isSameMonth, addDays
} from "date-fns";
import ModalCalendar from "Components/Calendar/ModalCalendar/ModalCalendar";

class CalendarCells extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedDate: undefined, modalIsOpen: false};
  }

  openModal = (day) => this.setState({selectedDate: day, modalIsOpen: true});

  closeModal = () => this.setState({modalIsOpen: false, selectedDate: undefined});

  render() {
    const {currentMonth, selectedDate, dateLocale} = this.props;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
    const endDate = endOfWeek(monthEnd, {weekStartsOn: 1});

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDateDay = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDateDay = format(day, dateFormat, dateLocale);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.openModal(cloneDay)}
          >
            <span className="number">{formattedDateDay}</span>
            <span className="bg">{formattedDateDay}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="row" key={day}>{days}</div>);
      days = [];
    }
    return (
      <div className="body">
        {rows}
        <ModalCalendar modalIsOpen={this.state.modalIsOpen}
          selectedDate={this.state.selectedDate}
          closeModal={this.closeModal}
          dateLocale={this.props.dateLocale}
        />
      </div>

    );
  }
}


export default CalendarCells;
