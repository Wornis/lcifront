import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Compta from './js/containers/Compta';
import NotFound from './js/containers/NotFound';
import Form from './js/containers/Form';
import Layout from './js/containers/Layout';
import Stats from './js/containers/Stats';
import Calendar from './js/containers/Calendar';
import Store from './js/redux/configureStore';
import {Provider} from 'react-redux';
import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline';
import red from '@material-ui/core/es/colors/red';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import frLocale from 'date-fns/locale/fr';
import '../src/index.css';
import LocalizedUtils from './js/utils/LocalizedUtils';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#6d4c41',
        },
        secondary: {
            main: '#9e9e9e'
        },
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
    typography: {
        useNextVariants: true,
    },
});

const styles = {
    top: 64,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute'
};

const Root = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
                <CssBaseline/>
                <Provider store={Store}>
                    <BrowserRouter>
                        <Layout>
                            <div
                                id={'root'}
                                style={styles}
                            >
                                <Switch>
                                    <Route exact path='/' component={Form}/>
                                    <Route exact path='/compta' component={Compta}/>
                                    <Route exact path='/stats' component={Stats}/>
                                    <Route exact path='/calendar' component={Calendar}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            </div>
                        </Layout>
                    </BrowserRouter>
                </Provider>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
};

ReactDOM.render(<Root/>, document.getElementById('root'));
