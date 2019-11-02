import React from 'react';
import {DatePicker} from 'material-ui-pickers';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

const FormCalendar = props => {
  const onChange = (newDate) =>
    props.onChangeDate(format(newDate, 'yyyy-MM-dd'));

  return (
    <div className="picker" style={{marginBottom: 15, width: 240}}>
      <AccessTimeIcon style={{marginTop: 20}} />
      <DatePicker
        disabled={props.disabled}
        id='formCalendarDatePicker'
        label="Date"
        value={props.selectedDate}
        style={{marginLeft: 10}}
        onChange={onChange.bind(this)}
        animateYearScrolling
        format="d MMM yyyy"
      />
    </div>
  );
};

FormCalendar.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onChangeDate: PropTypes.func.isRequired
};
export default FormCalendar;

