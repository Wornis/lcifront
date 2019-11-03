import React from 'react';
import '../../assets/css/Calendar.css';
import CalendarHeader from "Components/Calendar/CalendarHeader";
import frLocale from 'date-fns/locale/fr';
import CalendarDays from "Components/Calendar/CalendarDays";
import CalendarCells from "Components/Calendar/CalendarCells";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getEvents} from "Actions/calendar";
import {getMonth, getYear} from 'date-fns';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedDate: new Date()};
    this.dateLocale = {locale: frLocale};
  }

  getEventsOfYear = (date) => this.props.getEvents(getYear(date));

  componentDidMount = () => this.getEventsOfYear(this.state.selectedDate);

  onChangeMonth = (selectedDate) => {
    if (!this.props.events[getYear(selectedDate)])
      this.getEventsOfYear(selectedDate);
    return this.setState({selectedDate});
  };

  render() {
    return (
      <div>
        <div className="calendar">
          <CalendarHeader
            selectedDate={this.state.selectedDate}
            dateLocale={this.dateLocale}
            onChangeMonth={this.onChangeMonth}/>
          <CalendarDays
            selectedDate={this.state.selectedDate}
            dateLocale={this.dateLocale}/>
          <CalendarCells
            selectedDate={this.state.selectedDate}
            dateLocale={this.dateLocale}
          />
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({events: state.calendar.events});
const mapDispatchToProps = dispatch => bindActionCreators({getEvents}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
