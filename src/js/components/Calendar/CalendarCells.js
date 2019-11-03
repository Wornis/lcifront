import React from "react";
import {
  endOfMonth, endOfWeek, startOfMonth, startOfWeek,
  isSameDay, format, isSameMonth, addDays,
} from "date-fns";
import ModalCalendar from "Components/Calendar/ModalCalendar/ModalCalendar";

export default class CalendarCells extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedDate: undefined, modalIsOpen: false};
  }

  openModal = (day) => this.setState({selectedDate: day, modalIsOpen: true});

  closeModal = () => this.setState({modalIsOpen: false, selectedDate: undefined});

  getDayContent = (day) => {
    if (this.props.events) {
      const dayEvents = this.props.events.filter(event => isSameDay(event.date, day));
      const midiEvents = dayEvents.filter(event => event.service === 'midi');
      const soirEvents = dayEvents.filter(event => event.service === 'soir');
      return (
        <div className='cell-content' style={{marginLeft: 2}}>
          <div className='calendar-cell-matin'>
            {
              midiEvents.map((event, index) => {
                return (
                  <div
                    style={{background: event.color}}
                    key={index}
                  >
                    {event.libelle}
                  </div>
                );
              })
            }
          </div>
          <div>
            {
              soirEvents.map((event, index) => {
                return (
                  <div
                    style={{background: event.color}}
                    key={index}
                  >
                    {event.libelle}
                  </div>
                );
              })
            }
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    const {selectedDate, dateLocale} = this.props;
    const monthStart = startOfMonth(selectedDate);
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
                : isSameDay(day, new Date()) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.openModal(cloneDay)}
          >
            {this.getDayContent(day)}
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
