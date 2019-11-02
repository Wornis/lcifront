import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {arrMonths, arrYears} from "Constants/dates";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ComptaSelectDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      month: props.month,
      year: props.year
    };
  }

  handleChange = name => event => this.setState({[name]: Number(event.target.value)});

  handleClickOpen = () => this.setState({open: true});

  handleClose = valided => () => {
    const {month, year} = this.state;
    if (valided)
      this.props.fetchComptaDatas({month, year});
    return this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Button
          variant="contained"
          onClick={this.handleClickOpen}
          color='primary'
        >
          Changer mois | année
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Changer mois | année</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="compta_dialog_month">Mois</InputLabel>
                <Select
                  value={this.state.month}
                  onChange={this.handleChange('month')}
                  input={<Input id="compta_dialog_month"/>}
                >
                  {arrMonths.map((month, index) => <MenuItem key={index} value={index + 1}>{month}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="compta_dialog_year">Année</InputLabel>
                <Select
                  value={this.state.year}
                  onChange={this.handleChange('year')}
                  input={<Input id="compta_dialog_year"/>}
                >
                  {arrYears.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleClose(true)} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ComptaSelectDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComptaSelectDialog);
