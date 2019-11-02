import PropTypes from 'prop-types';
import React from "react";

const StatsMonth = (props) => {
  //const {classes, year, datasYear, handleChangeDate, month} = props;
  return (
    <div className='container'>
    </div>
  );
};

StatsMonth.propTypes = {
  classes: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  datasYear: PropTypes.array.isRequired,
  handleChangeDate: PropTypes.func.isRequired
};

export default StatsMonth;
