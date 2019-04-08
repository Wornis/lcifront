import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyIcon from '@material-ui/icons/Money';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/es/TextField/TextField';
import FormControl from '@material-ui/core/es/FormControl/FormControl';
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel';
import Select from '@material-ui/core/es/Select/Select';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import FormCalendar from '../components/Form/FormCalendar';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import {CircularProgress} from '@material-ui/core/es/index';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        width: 150
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    formControl: {
        margin: theme.spacing.unit,
        width: 200,
    },
    inputColor: {
        color: 'red'
    }
});

const style = {
    icon: {
        marginTop: 20
    },
    divTextField: {
        marginBottom: 30
    }
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            espValue: '',
            trValue: '',
            cbValue: '',
            totalValue: '',
            dateValue: format(new Date(), 'yyyy-MM-dd'),
            place: 'none',
            submitted: false,
            errors: {
                espValue: false,
                trValue: false,
                cbValue: false
            }
        };
    }

    checkIfErrOnMoneyFields = () => {
        const keys = ['espValue', 'trValue', 'cbValue'];
        let emptyFields = false;
        keys.forEach(key => {
            if (!this.state[key]) { // If the value is empty
                emptyFields = true;
                this.setState((prevState) => ({errors: {...prevState.errors, [key]: true}}));
            }
        });
        const errored = Object.values(this.state.errors).some(boolError => boolError); // Check if no errors
        return emptyFields || errored;
    };

    handleSubmit = () => {
        const boolErrMoneys = this.checkIfErrOnMoneyFields();
        if (!boolErrMoneys && this.state.place && isValid(new Date(this.state.dateValue))) {
            return this.setState({submitted: true});
        }
    };

    checkIfInCorrectValue = (value) => {
        if (value.includes('.')) {
            const afterDotValue = value.substring(value.indexOf('.') + 1);
            return (isNaN(value) || afterDotValue.length > 2);
        }
        return isNaN(value);
    };

    getNewTotal = (selectedKey, value) => {
        value = (!value) ? 0 : value;
        const espValue = (selectedKey === 'espValue') ? value : this.state.espValue || 0;
        const trValue = (selectedKey === 'trValue') ? value : (this.state.trValue || 0);
        const cbValue = (selectedKey === 'cbValue') ? value : this.state.cbValue || 0;
        const newTotal = (parseFloat(espValue) + parseFloat(trValue) + parseFloat(cbValue)).toFixed(2);
        return (newTotal > 0) ? newTotal : '';
    };

    onChangeValue = (e) => {
        const selectedKey = e.target.id;
        const value = e.target.value;
        let errored = false;

        if (this.checkIfInCorrectValue(value)) {
            errored = true;
            this.setState((prevState) => ({errors: {...prevState.errors, [selectedKey]: true}}));
        } else if (this.state.errors[selectedKey]) {
            this.setState((prevState) => ({errors: {...prevState.errors, [selectedKey]: false}}));
            if (!value) // If value field is empty
                return this.setState({[selectedKey]: value, totalValue: ''});
        }
        this.setState({[selectedKey]: value});
        if (errored) {
            return this.setState({totalValue: ''});
        }
        return this.setState({totalValue: this.getNewTotal(selectedKey, value)});
    };

    onChangeDate = (dateValue) =>
        this.setState({dateValue});

    getHelperText = (errorValue) =>
        errorValue ? 'La valeur saisie est incorrecte' : '';

    render() {
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <CreateIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Formulaire
                    </Typography>
                    <form className={classes.form} autoComplete='off'>
                        <FormCalendar
                            selectedDate={this.state.dateValue}
                            onChangeDate={this.onChangeDate.bind(this)}
                        />
                        <div style={{marginBottom: 20}}>
                            <MyLocationIcon style={{marginTop: 30}}/>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-place">Emplacement</InputLabel>
                                <Select
                                    value={this.state.place}
                                    inputProps={{name: 'place', id: 'select-place'}}
                                    onChange={(e) => this.setState({place: e.target.value})}
                                >
                                    <MenuItem value='none'>None</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={style.divTextField}>
                            <EuroSymbolIcon style={style.icon}/>
                            <TextField
                                id="espValue"
                                label="Espèces"
                                className={classes.textField}
                                value={this.state.espValue}
                                onChange={this.onChangeValue.bind(this)}
                                error={this.state.errors.espValue}
                                helperText={this.getHelperText(this.state.errors.espValue)}
                            />
                        </div>
                        <div style={style.divTextField}>
                            <MoneyIcon style={style.icon}/>
                            <TextField
                                id="trValue"
                                label="Tickets Restaurants"
                                className={classes.textField}
                                value={this.state.trValue}
                                onChange={this.onChangeValue.bind(this)}
                                error={this.state.errors.trValue}
                                helperText={this.getHelperText(this.state.errors.trValue)}
                            />
                        </div>
                        <div style={style.divTextField}>
                            <CreditCardIcon style={style.icon}/>
                            <TextField
                                id="cbValue"
                                label="Cartes Bancaires"
                                className={classes.textField}
                                value={this.state.cbValue}
                                onChange={this.onChangeValue.bind(this)}
                                error={this.state.errors.cbValue}
                                helperText={this.getHelperText(this.state.errors.cbValue)}
                            />
                        </div>
                        <div style={style.divTextField}>
                            <MonetizationOnIcon style={style.icon}/>
                            <TextField
                                InputProps={{classes: {input: classes.inputColor}}}
                                disabled
                                id="totalValue"
                                label="Total"
                                className={classes.textField}
                                value={this.state.totalValue}
                            />
                        </div>
                        {
                            this.state.submitted ?
                                <CircularProgress className={classes.progress} /> :
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    Valider
                                </Button>
                        }
                    </form>
                </Paper>
            </main>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
