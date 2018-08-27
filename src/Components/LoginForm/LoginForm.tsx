/* Components/LoginForm/LoginForm.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import * as UI                                        from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { LoginFormProps, LoginFormState }             from './Types';

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      password:         '', 
      showPassword:     false,
      snackbarMessage:  '',
      snackbarOpen:     false,
      username:         '',
    }
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.loginContainer}>
        <div className={classes.formContainer}>
          <form style={{width: 223}}>
            <UI.FormControl>
              <UI.InputLabel htmlFor="login-username">Username</UI.InputLabel>
              <UI.Input
                name="username"
                id="login-username"
                value={this.state.username}
                onChange={this.handleChange}
                autoComplete="username"
                onKeyDown={this.handleKeyDown}
                style={{width: 223}}
              />
            </UI.FormControl>
            <UI.FormControl style={{marginTop: 5}}>
              <UI.InputLabel htmlFor="login-password">Password</UI.InputLabel>
              <UI.Input
                name="password"
                id="login-password"
                value={this.state.password}
                onChange={this.handleChange}
                autoComplete="password"
                onKeyDown={this.handleKeyDown}

                type={this.state.showPassword ? 'text' : 'password'}
                endAdornment={
                  <UI.InputAdornment position="end">
                    <UI.IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <Icons.VisibilityOff /> : <Icons.Visibility />}
                    </UI.IconButton>
                  </UI.InputAdornment>
                }
              />
            </UI.FormControl>
            <div className={classes.buttonsContainer}>
              <UI.Button onClick={this.login} variant="contained" color="primary" className={classes.buttonsStyle}>
                Login
              </UI.Button>
              <UI.Button onClick={this.register} variant="contained" color="primary"  className={classes.buttonsStyle}>
                Register
              </UI.Button>
            </div>
            
          </form>
        </div>
        <UI.Snackbar
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.hideSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          TransitionComponent={UI.Fade}
          action={[
            <UI.IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.hideSnackbar}
            >
              <Icons.Close />
            </UI.IconButton>,
          ]}
        />
      </div>
    );
  }

  private login = () => {
    Models.DeviceAPI.create(this.state.username, this.state.password)
    .then(({ error, warning, message, content}: Models.DeviceResponseData) => {
      // Check that the Device was created successfully.
      if (content !== null && content !== undefined && 'authToken' in content) {
        // Update local storage and state with the new authToken.
        localStorage.setItem('authToken', content.authToken);
        this.props.setAuthStateAction(content.authToken);
      } else {
        if (error) {
          alert('Error: ' + message);
        }
        else if (warning) {
          this.showSnackbar(message);
          // alert('Warning: ' + message);
        }
      }
    })
    .catch((err: any) => {
      // tslint:disable-next-line:no-console
      console.log(err);
      alert('Unexpected Error. Please try again.');
      window.location.reload();
    });
  }

  private register = () => {
    Models.UserAPI.create(this.state.username, this.state.password)
    .then(({ error, warning, message, content}: Models.UserResponseData) => {
      if (error) {
        alert('Error: ' + message);
      }
      else if (warning) {
        this.showSnackbar(message);
        // alert('Warning: ' + message);
      }
      else {
        this.showSnackbar(message);
        // alert('Info: ' + message);
      }
    })
    .catch((err: any) => {
      alert('Unexpected Error. Please try again.');
      window.location.reload();
    });
  }

  private handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  private handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  private handleClickShowPassword = () => {
    this.setState( (state: any) => ({ showPassword: !state.showPassword }));
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  private showSnackbar = (message: string) => {
    this.setState({
      snackbarMessage: message,
      snackbarOpen: true,
    });
  }

  private hideSnackbar = () => {
    this.setState({ snackbarOpen: false });
  }

}

export default LoginForm;