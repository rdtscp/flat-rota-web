/* App/App.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import CircularProgress                               from '@material-ui/core/CircularProgress';
import CssBaseline                                    from '@material-ui/core/CssBaseline';
import LinearProgress                                 from '@material-ui/core/LinearProgress';
import { MuiThemeProvider }                           from '@material-ui/core/styles';

/* This Project */
import AppNavigator                                   from 'src/Components/AppNavigator';
import LoginForm                                      from 'src/Components/LoginForm';

/* This Component */
import { appTheme }                                   from './Theme';
import { AppProps }                                   from './Types';

class App extends React.Component<AppProps> {

  public render() {
    const { authState, classes, currentUser }   = this.props;

    const localAuthToken: string | null         = localStorage.getItem('authToken');

    /* Device thinks its Authenticated, but the State AuthToken not set. */
    if (localAuthToken !== null && authState.authStatus === false) {
      this.props.setAuthStateAction(localAuthToken);
      return (
        <MuiThemeProvider theme={appTheme}>
          <CssBaseline />
          <div className={classes.loadingContainer}>
            <div style={{width: 300}}>
              <LinearProgress color="primary"/>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
    else if (authState.authStatus === false) {
      return (
        <MuiThemeProvider theme={appTheme}>
          <CssBaseline />
            <LoginForm />
        </MuiThemeProvider>
      );
    }
    else if (authState.authStatus === true && currentUser.id === '') {
      return (
        <MuiThemeProvider theme={appTheme}>
          <CssBaseline />
          <div className={classes.loadingContainer}>
            <div style={{width: 56.56}}>
              <CircularProgress color="primary"/>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
    else {
      return (
        <MuiThemeProvider theme={appTheme}>
          <CssBaseline />
          <AppNavigator />
        </MuiThemeProvider>
      );
    }
  }

}

export default App;