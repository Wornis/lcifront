import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {arrYears} from "Constants/dates";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from 'prop-types'
import React from "react";

const StatsYear = (props) => {
    const {classes, year, datasYear, handleChangeDate} = props;
    return (
        <div className='container'>
            <FormControl className={classes.formControl} style={{marginTop: 25}}>
                <InputLabel htmlFor="select_year_compta">Année :</InputLabel>
                <Select
                    id='select_year_compta'
                    value={year}
                    inputProps={{name: 'year', id: 'select_year_compta'}}
                    onChange={(e) => handleChangeDate(e.target.value)}
                >
                    {arrYears.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)}
                </Select>
            </FormControl>
            <div className='col-lg-12 col-md-12'>
                <h2 style={{textAlign: 'center'}}>Evolution du chiffre d'affaire sur l'année {year}</h2>
                <BarChart
                    style={{background: 'oldlace', margin: 'auto'}}
                    width={650}
                    height={300}
                    data={datasYear}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis type="number" domain={[0, 45000]} />
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="sumTotal" fill="#8884d8" label={{fontSize: 12, fontWeight: 'bold'}}/>
                </BarChart>
            </div>
            <div className='col-lg-12 col-md-12' style={{marginTop: 25}}>
                <h2 style={{textAlign: 'center'}}>Total de services réalisés sur l'année {year} </h2>
                <BarChart
                    style={{background: 'oldlace', margin: 'auto'}}
                    width={650}
                    height={300}
                    data={datasYear}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis type="number" domain={[0, 50]} />
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="nbServices" fill="#FFA500" label/>
                </BarChart>
            </div>
        </div>
   );
};

StatsYear.propTypes = {
    classes: PropTypes.object.isRequired,
    year: PropTypes.number.isRequired,
    datasYear: PropTypes.array.isRequired,
    handleChangeDate: PropTypes.func.isRequired
};

export default StatsYear;