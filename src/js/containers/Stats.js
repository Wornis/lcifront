import React from "react";
import {connect} from "react-redux";
import {fetchStatsOfYear} from "Actions/stats";
import {bindActionCreators} from 'redux';
import {toast} from "react-toastify";
import {arrMonths} from "Constants/dates";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import StatsYear from "Components/Stats/StatsYear";
import StatsMonth from "Components/Stats/StatsMonth";

const styles = theme => ({
    formControl: {
        margin: 'auto',
        width: 70,
        textAlign: 'center',
        display: 'flex',
    }
});

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasYear: [],
            year: new Date().getFullYear(),
            month: null,
            tabValue: 0
        };
    }

    componentDidMount() {
        this.props.fetchStatsOfYear({year:this.state.year});
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.triggerNeededToasts(nextProps);
        this.formatDatasYear(nextProps);
    }

    formatDatasYear = (nextProps) => {  //Datas updated from redux
        const datasYear = arrMonths.map(month => ({month: month.substring(0, 4)}));
        nextProps.datasYear.forEach(({sumTotal, intMonth}) =>
            datasYear[intMonth - 1].sumTotal = parseInt(sumTotal));
        return this.setState({year: nextProps.year, datasYear});
    };

    triggerNeededToasts = (nextProps) => {
        if (nextProps.error)
            return toast.error(`❌ ${nextProps.error}`);
    };

    handleChangeDate = (year, month = null) => {
        if (this.state.year !== year || this.state.month !== month) //avoid fetch if same date
            return this.props.fetchStatsOfYear({year, month});
    };

    handleTabChange = (event, tabValue) =>
        this.setState({tabValue});

    render() {
        const {classes} = this.props;
        const {year, datasYear, month} = this.state;
        console.log(this.state)
        return (
            <div className='container'>
                <AppBar
                    position="static"
                    style={{width: 'fit-content', margin: 'auto', marginTop: 5}}
                >
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.handleTabChange}
                        centered
                    >
                        <Tab label="Année"/>
                        <Tab label="Mois"/>
                    </Tabs>
                </AppBar>
                {
                    this.state.tabValue === 0 ?
                        <StatsYear
                            classes={classes}
                            year={year}
                            datasYear={datasYear}
                            handleChangeDate={this.handleChangeDate}
                        /> :
                        <StatsMonth
                            classes={classes}
                            year={year}
                            month={month}
                            datasYear={datasYear}
                            handleChangeDate={this.handleChangeDate}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({...state.stats});

const mapDispatchToProps = dispatch => bindActionCreators({fetchStatsOfYear}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Stats));
