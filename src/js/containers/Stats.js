import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {connect} from "react-redux";
import {fetchStatsOfYear} from "Actions/stats";
import {bindActionCreators} from 'redux';
import {toast} from "react-toastify";
import {arrMonths} from "Constants/dates";

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasYear: [],
            year: new Date().getFullYear()
        };
    }

    componentDidMount() {
        this.props.fetchStatsOfYear(2018);
    }

    componentWillReceiveProps(nextProps) {
        this.triggerNeededToasts(nextProps);
        this.formatDatasYear(nextProps);
    }

    formatDatasYear = (nextProps) => {
        if (nextProps.datasYear !== this.props.datasYear) { //datasYear updated from redux
            const datasYear = arrMonths.map((month, index) =>
                ({...nextProps.datasYear[index], month: month.substring(0, 4)})
            );
            return this.setState({datasYear});
        }
    };

    triggerNeededToasts = (nextProps) => {
        if (nextProps.error)
            return toast.error(`❌ ${nextProps.error}`);
    };

    render() {
        return (
            <div className='container'>
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
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="sumTotal" fill="#8884d8"/>
                    </BarChart>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({...state.stats});

const mapDispatchToProps = dispatch => bindActionCreators({fetchStatsOfYear}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
