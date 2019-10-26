import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Compta from 'Containers/Compta';
import NotFound from 'Containers/NotFound';
import Form from 'Containers/Form';
import Layout from 'Containers/Layout';
import Stats from 'Containers/Stats';
import Calendar from 'Containers/Calendar';
import Store from 'Redux/configureStore';
import {Provider} from 'react-redux';
import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline';
import red from '@material-ui/core/es/colors/red';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import frLocale from 'date-fns/locale/fr';
import '../src/index.css';
import LocalizedUtils from 'Utils/LocalizedUtils';
import { hot } from 'react-hot-loader/root';

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

const App = () => {
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

export default hot(App);
