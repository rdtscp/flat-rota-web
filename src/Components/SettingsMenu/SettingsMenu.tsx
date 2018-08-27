/* Components/SettingsMenu/SettingsMenu.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import * as UI                                        from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import * as Components                                from 'src/Components';
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
        <UI.AppBar color="default" position="static">
          <UI.Toolbar>
            <UI.IconButton onClick={this.props.closeSettings} className={classes.menuButton} color="inherit" aria-label="Menu">
              <Icons.ArrowBack />
            </UI.IconButton>
            <UI.Typography variant="title" color="inherit" className={classes.flex}>
              Settings
            </UI.Typography>
            <UI.Button onClick={this.openConfirmLogoutAlert} variant="outlined" color="secondary">
              Log Out
            </UI.Button>
          </UI.Toolbar>
        </UI.AppBar>

        <UI.ExpansionPanel>
          <UI.ExpansionPanelSummary expandIcon={<Icons.ExpandMore />}>
            <Icons.Smartphone /> &nbsp;&nbsp;&nbsp;
            <UI.Typography className={classes.heading}> Device Settings</UI.Typography>
          </UI.ExpansionPanelSummary>
          <UI.ExpansionPanelDetails>
            <Components.DeviceList />
          </UI.ExpansionPanelDetails>
        </UI.ExpansionPanel>

        <UI.ExpansionPanel>
          <UI.ExpansionPanelSummary expandIcon={<Icons.ExpandMore />}>
            <Icons.DeleteForever /> &nbsp;&nbsp;&nbsp;
            <UI.Typography className={classes.heading}>Delete Account</UI.Typography>
          </UI.ExpansionPanelSummary>
          <UI.ExpansionPanelDetails>
          <div className={classes.deleteAccountContainer}>
            <Components.ConfirmDelete />
          </div>
            
          </UI.ExpansionPanelDetails>
        </UI.ExpansionPanel>

        <UI.Dialog
          open={this.state.confirmationLogoutAlertOpen}
          onClose={this.cancelConfirmLogoutAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <UI.DialogTitle id="alert-dialog-title">{"Confirm Logout"}</UI.DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.deviceToLogoutString}
            </DialogContentText>
          </DialogContent> */}
          <UI.DialogActions>
            <UI.Button onClick={this.cancelConfirmLogoutAlert} color="primary">
              Cancel
            </UI.Button>
            <UI.Button onClick={this.logout} color="primary" autoFocus={true}>
              Logout
            </UI.Button>
          </UI.DialogActions>
        </UI.Dialog>
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
        window.location.reload();
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