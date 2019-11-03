import React from 'react';
import ComptaTable from "Components/Compta/ComptaTable";
import ComptaTotalTable from "Components/Compta/ComptaTotalTable";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchComptaDatas} from "Actions/compta";
import {toast} from "react-toastify";
import ComptaTabs from "Components/Compta/ComptaTabs";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import {arrMonths, arrYears} from "Constants/dates";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: 112,
  }
});

class Compta extends React.Component {
  constructor(props) {
    super(props);
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
    const {recettes, totaux, classes, isLoading} = this.props;
    return (
      <div style={{display: 'flex'}}>
        <ComptaTable recettes={recettes} isLoading={isLoading}/>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <FormControl className={classes.formControl} style={{marginTop: 25}}>
            <InputLabel htmlFor="select_month_compta">Mois :</InputLabel>
            <Select
              id='select_month_compta'
              value={this.state.month}
              inputProps={{name: 'month', id: 'select_month_compta'}}
              onChange={this.updateSelectedDate.bind(this)}
            >
              {arrMonths.map((month, index) => <MenuItem key={index} value={index + 1}>{month}</MenuItem>)}

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
              {arrYears.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <ComptaTotalTable totaux={totaux} isLoading/>
      </div>
    );
  };

  render() {
    const {recettes, totaux, fetchComptaDatas, isLoading} = this.props;
    const {month, year} = this.state;
    return (this.state.showTabsPage || window.innerWidth < 1100)
      ? <ComptaTabs
        recettes={recettes}
        totaux={totaux}
        month={month}
        year={year}
        fetchComptaDatas={fetchComptaDatas}
        isLoading={isLoading}
      />
      : this.renderComptaSingle();
  }
}

const mapStateToProps = state => ({...state.compta});
const mapDispatchToProps = dispatch => bindActionCreators({fetchComptaDatas}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Compta));

