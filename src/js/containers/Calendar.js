import React from 'react';
import '../../assets/css/Calendar.css';
import CalendarHeader from "Components/Calendar/CalendarHeader";
import frLocale from 'date-fns/locale/fr';
import CalendarDays from "Components/Calendar/CalendarDays";
import CalendarCells from "Components/Calendar/CalendarCells";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentMonth: new Date()};
    this.dateLocale = {locale: frLocale};
  }

  onChangeMonth = (newMonth) => this.setState({currentMonth: newMonth});

  render() {
    return (
      <div>
        <div className="calendar">
          <CalendarHeader
            currentMonth={this.state.currentMonth}
            dateLocale={this.dateLocale}
            onChangeMonth={this.onChangeMonth}/>
          <CalendarDays
            currentMonth={this.state.currentMonth}
            dateLocale={this.dateLocale}/>
          <CalendarCells
            currentMonth={this.state.currentMonth}
            dateLocale={this.dateLocale}
          />
        </div>
      </div>

    );
  }
}
