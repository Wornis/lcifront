import React from 'react';
import ComptaTable from "Components/Compta/ComptaTable";
import ComptaTotalTable from "Components/Compta/ComptaTotalTable";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchComptaDatas} from "Actions/compta";
import {toast} from "react-toastify";
import ComptaTabs from "Components/Compta/ComptaTabs";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: 200,
    }
});

const arrMonths = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const arrYears = [2014, 2015, 2016, 2017, 2018, 2019];

class Compta extends React.Component {
    constructor() {
        super();
        const now = new Date();
        this.state = {
            showTabsPage: false,
            month: now.getMonth() + 1,
            year: now.getFullYear()
        };
    }

    componentDidMount() {
        const {month, year} = this.state;
        this.props.fetchComptaDatas({month, year});
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.triggerNeededToasts(nextProps);
    }

    triggerNeededToasts = (nextProps) => {
        if (nextProps.error)
            return toast.error(`❌ ${nextProps.error}`);
    };

    updateSelectedDate(e) {
        const {value, name} = e.target;
        return this.setState({[name]: value}, () => {
            const {month, year} = this.state;
            this.props.fetchComptaDatas({month, year});
        });
    }

    updateDimensions() {
        const showTabsPage = window.innerWidth < 1100;
        if (this.state.showTabsPage !== showTabsPage)
            return this.setState({showTabsPage});
    }

    renderComptaSingle = () => {
        const {recettes, totaux, classes} = this.props;
        return (
            <div style={{display: 'flex'}}>
                <ComptaTable recettes={recettes}/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <FormControl className={classes.formControl} style={{marginTop: 25}}>
                        <InputLabel htmlFor="select_month_compta">Mois :</InputLabel>
                        <Select
                            id='select_month_compta'
                            value={this.state.month}
                            inputProps={{name: 'month', id: 'select_month_compta'}}
                            onChange={this.updateSelectedDate.bind(this)}
                        >
                            {arrMonths.map((month, index) => <MenuItem value={index + 1}>{month}</MenuItem>)}

                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} style={{marginTop: 25}}>
                        <InputLabel htmlFor="select_year_compta">Année :</InputLabel>
                        <Select
                            id='select_year_compta'
                            value={this.state.year}
                            inputProps={{name: 'year', id: 'select_year_compta'}}
                            onChange={this.updateSelectedDate.bind(this)}
                        >
                            {arrYears.map(year => <MenuItem value={year}>{year}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <ComptaTotalTable totaux={totaux}/>
            </div>
        );
    };

    render() {
        const {recettes, totaux} = this.props;
        return (this.state.showTabsPage || window.innerWidth < 1100)
            ? <ComptaTabs recettes={recettes} totaux={totaux}/>
            : this.renderComptaSingle();
    }
}

const mapStateToProps = state => ({...state.compta});

const mapDispatchToProps = dispatch => bindActionCreators({fetchComptaDatas}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Compta));

