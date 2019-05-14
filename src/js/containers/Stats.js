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
            tabValue: 0
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
        if (nextProps.year !== this.props.year) { //Datas updated from redux
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
            return this.setState({year: nextProps.year, datasYear});
        }
    };

    triggerNeededToasts = (nextProps) => {
        if (nextProps.error)
            return toast.error(`❌ ${nextProps.error}`);
    };

    handleChangeDate = year => {
        if (this.state.year !== year) { //avoid fetch if same year
            this.props.fetchStatsOfYear(year);
        }
    };

    handleTabChange = (event, tabValue) =>
        this.setState({tabValue});

    render() {
        const {classes} = this.props;
        const {year, datasYear} = this.state;
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
                    this.state.tabValue === 0 &&
                    <StatsYear
                        classes={classes}
                        year={year}
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
