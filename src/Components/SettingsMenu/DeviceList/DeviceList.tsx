/* Components/SettingsMenu/DeviceList/DeviceList.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';
import { UAParser }                                   from 'ua-parser-js';

/* Material-UI */
import Button                                         from '@material-ui/core/Button';
import Dialog                                         from '@material-ui/core/Dialog';
import DialogActions                                  from '@material-ui/core/DialogActions';
import DialogContent                                  from '@material-ui/core/DialogContent';
import DialogContentText                              from '@material-ui/core/DialogContentText';
import DialogTitle                                    from '@material-ui/core/DialogTitle';
import Fade                                           from '@material-ui/core/Fade';
import IconButton                                     from '@material-ui/core/IconButton';
import Snackbar                                       from '@material-ui/core/Snackbar';
import CloseIcon                                      from '@material-ui/icons/Close';

/* This Project */
import Device                                         from 'src/Components/SettingsMenu/Device';
import * as Models                                    from 'src/Models';
import utilities                                      from 'src/Resources/utilitiesHelper';

/* This Component */
import { DeviceListProps, DeviceListState }           from './Types';

class DeviceList extends React.Component<DeviceListProps, DeviceListState> {

  constructor(props: DeviceListProps) {
    super(props);
    this.state = {
      confirmationAlertOpen:    false,
      confirmationSnackbarOpen: false,
      deviceToLogoutAuthToken:  '',
      deviceToLogoutID:         '',
      deviceToLogoutString:     '',

    }
  }

  public render() {
    
    const { authState, classes, devices } = this.props;

    return (
      <div className={classes.devicesContainer}>
        <Dialog
          open={this.state.confirmationAlertOpen}
          onClose={this.cancelConfirmLogoutAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Logout Device"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.deviceToLogoutString}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelConfirmLogoutAlert} color="primary">
              Cancel
            </Button>
            <Button onClick={this.logoutDevice} color="primary" autoFocus={true}>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
        {devices.map((device: Models.Device, index: number) => {
          const lastUsedStr: string  = utilities.unixToDateTime(device.lastUsed);
          const thisDevice:  boolean = (device.authToken === authState.authToken) ? true : false;
          const parsedUA:    string  = this.parseUserAgent(device.userAgent);
          return(
            <Device key={index} id={device.id} authToken={device.authToken} lastUsed={lastUsedStr} logout={this.openConfirmLogoutAlert} thisDevice={thisDevice} userAgentStr={parsedUA} />
          )
        })}
        <Snackbar
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          open={this.state.confirmationSnackbarOpen}
          autoHideDuration={3000}
          onClose={this.closeSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Device Logged Out</span>}
          TransitionComponent={Fade}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }

  private openConfirmLogoutAlert = (deviceID: string, deviceAuthToken: string, deviceString: string) => {
    this.setState({
      confirmationAlertOpen:    true,
      deviceToLogoutAuthToken:  deviceAuthToken,
      deviceToLogoutID:         deviceID,
      deviceToLogoutString:     deviceString,
    });
  }

  private cancelConfirmLogoutAlert = () => {
    this.setState({ confirmationAlertOpen: false });
  }

  private logoutDevice = () => {
    this.setState({ confirmationAlertOpen: false });

    const deviceAuthToken = this.state.deviceToLogoutAuthToken;
    const deviceID        = this.state.deviceToLogoutID;

    Models.DeviceAPI.destroy(this.props.authState.authToken, deviceID, deviceAuthToken)
    .then(({ error, warning, message, content }: Models.DeviceResponseData) => {
      if (error) {
        alert('Error: ' + message);
        this.props.setAuthStateAction('');
      }
      else if (warning) {
        alert('Warning: ' + message);
      }
      else if (this.props.authState.authToken === deviceAuthToken) {
        this.props.setAuthStateAction('');
      }
      else {
        this.setState({ confirmationSnackbarOpen: true });
        this.props.setCurrentUserAction(this.props.authState.authToken);
      }      
    })
    .catch((err: any) => {
      alert('Unexpected Error, Please Refresh & Try Again');
      window.location.reload();
    });
  }

  private closeSnackbar = () => {
    this.setState({ confirmationSnackbarOpen: false });
  }

  private parseUserAgent(userAgentString: string)  {
    const parser = new UAParser();
    const userAgent = parser.setUA(userAgentString).getResult();
    
    return userAgent.browser.name + " on " + userAgent.os.name;
  }

}

export default DeviceList;