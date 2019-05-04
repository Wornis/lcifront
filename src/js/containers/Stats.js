import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {connect} from "react-redux";
import {fetchStatsOfYear} from "Actions/stats";
import {bindActionCreators} from 'redux';
import {toast} from "react-toastify";
import {arrMonths, arrYears} from "Constants/dates";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
    formControl: {
        margin: 'auto',
        width: 70,
        textAlign: 'center',
        display: 'flex',
    }
});

//TODO: Afficher graphique nbServices pour chaque mois de l'année sélectionnée
class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasYear: [],
            year: new Date().getFullYear()
        };
    }

    componentDidMount() {
        this.props.fetchStatsOfYear(this.state.year);
    }

    componentWillReceiveProps(nextProps) {
        this.triggerNeededToasts(nextProps);
        this.formatDatasYear(nextProps);
    }

    formatDatasYear = (nextProps) => {
        if (nextProps.datasYear !== this.props.datasYear) { //datasYear updated from redux
            const datasYear = arrMonths.map((month, index) => {
                if (nextProps.datasYear[index]) {
                    const dataMonth = {
                        ...nextProps.datasYear[index],
                        sumTotal: parseInt(nextProps.datasYear[index].sumTotal)
                    };
                    return {...dataMonth, month: month.substring(0, 4)};
                } else
                    return {month: month.substring(0, 4)};
            });
            return this.setState({datasYear});
        }
    };

    triggerNeededToasts = (nextProps) => {
        if (nextProps.error)
            return toast.error(`❌ ${nextProps.error}`);
    };

    handleChangeDate = e => {
        const {value} = e.target;
        return this.setState({year: value}, () => this.props.fetchStatsOfYear(this.state.year));
    };

    render() {
        console.log(this.state.datasYear);
        const {classes} = this.props;
        return (
            <div className='container'>
                <FormControl className={classes.formControl} style={{marginTop: 25}}>
                    <InputLabel htmlFor="select_year_compta">Année :</InputLabel>
                    <Select
                        id='select_year_compta'
                        value={this.state.year}
                        inputProps={{name: 'year', id: 'select_year_compta'}}
                        onChange={this.handleChangeDate.bind(this)}
                    >
                        {arrYears.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)}
                    </Select>
                </FormControl>
                <div className='col-lg-12 col-md-12'>
                    <h2 style={{textAlign: 'center'}}>Evolution du chiffre d'affaire sur l'année {this.state.year} </h2>
                    <BarChart
                        style={{background: 'oldlace', margin: 'auto'}}
                        width={650}
                        height={300}
                        data={this.state.datasYear}
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
                    <h2 style={{textAlign: 'center'}}>Total de services réalisés sur l'année {this.state.year} </h2>
                    <BarChart
                        style={{background: 'oldlace', margin: 'auto'}}
                        width={650}
                        height={300}
                        data={this.state.datasYear}
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
    }
}

const mapStateToProps = state => ({...state.stats});

const mapDispatchToProps = dispatch => bindActionCreators({fetchStatsOfYear}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stats));
