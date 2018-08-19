/* Components/SettingsMenu/SettingsMenu.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import { AppBar, Button, Dialog, DialogActions,
  DialogTitle, ExpansionPanel, ExpansionPanelDetails,
  ExpansionPanelSummary, IconButton, Toolbar,
  Typography
}                                                     from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import ConfirmDelete                                  from 'src/Components/ConfirmDelete';
import DeviceList                                     from 'src/Components/DeviceList';
import * as Models                                    from 'src/Models';

/* This Component*/
import { SettingsMenuProps, SettingsMenuState }       from './Types';

class SettingsMenu extends React.Component<SettingsMenuProps, SettingsMenuState> {

  constructor(props: SettingsMenuProps) {
    super(props);
    this.state = {
      confirmationLogoutAlertOpen: false,

    }
  }

  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar color="default" position="static">
          <Toolbar>
            <IconButton onClick={this.props.closeSettings} className={classes.menuButton} color="inherit" aria-label="Menu">
              <Icons.ArrowBack />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Settings
            </Typography>
            <Button onClick={this.openConfirmLogoutAlert} variant="outlined" color="secondary">
              Log Out
            </Button>
          </Toolbar>
        </AppBar>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<Icons.ExpandMore />}>
            <Icons.Smartphone /> &nbsp;&nbsp;&nbsp;
            <Typography className={classes.heading}> Device Settings</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <DeviceList />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<Icons.ExpandMore />}>
            <Icons.DeleteForever /> &nbsp;&nbsp;&nbsp;
            <Typography className={classes.heading}>Delete Account</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <div className={classes.deleteAccountContainer}>
            <ConfirmDelete />
          </div>
            
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Dialog
          open={this.state.confirmationLogoutAlertOpen}
          onClose={this.cancelConfirmLogoutAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.deviceToLogoutString}
            </DialogContentText>
          </DialogContent> */}
          <DialogActions>
            <Button onClick={this.cancelConfirmLogoutAlert} color="primary">
              Cancel
            </Button>
            <Button onClick={this.logout} color="primary" autoFocus={true}>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  private openConfirmLogoutAlert = () => {
    this.setState({ confirmationLogoutAlertOpen: true, });
  }

  private cancelConfirmLogoutAlert = () => {
    this.setState({ confirmationLogoutAlertOpen: false });
  }

  private logout = () => {
    const authToken = this.props.authState.authToken;
    const thisDevice: Models.Device = this.props.devices.filter(device => device.authToken === authToken)[0];
    this.logoutDevice(thisDevice.id, authToken)
  }

  private logoutDevice = (deviceID: string, deviceAuthToken: string) => {
    Models.DeviceAPI.destroy(deviceID, deviceAuthToken)
    .then(({ error, warning, message, content }: Models.DeviceResponseData) => {
      if (error) {
        alert('Error: ' + message);
        this.props.setAuthStateAction('');
        this.props.setCurrentUserAction();
      }
      else if (warning) {
        alert('Warning: ' + message);
      }
      else if (this.props.authState.authToken === deviceAuthToken) {
        this.props.setAuthStateAction('');
        this.props.setCurrentUserAction();
      }
      else {
        this.props.setCurrentUserAction();
      }
    })
    .catch((err: any) => {
      alert('Unexpected Error, Please Refresh & Try Again');
      window.location.reload();
    });
  }

}

export default SettingsMenu;