/* Components/SettingsMenu/SettingsMenu.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import AppBar                                         from '@material-ui/core/AppBar';
import Button                                         from '@material-ui/core/Button';
import Dialog                                         from '@material-ui/core/Dialog';
import DialogActions                                  from '@material-ui/core/DialogActions';
import DialogTitle                                    from '@material-ui/core/DialogTitle';
import ExpansionPanel                                 from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails                          from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary                          from '@material-ui/core/ExpansionPanelSummary';
import IconButton                                     from '@material-ui/core/IconButton';
import Toolbar                                        from '@material-ui/core/Toolbar';
import Typography                                     from '@material-ui/core/Typography';
import ArrowBackIcon                                  from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon                              from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon                                 from '@material-ui/icons/ExpandMore';
import SmartphoneIcon                                 from '@material-ui/icons/Smartphone';

/* This Project */
import ConfirmDelete                                  from 'src/Components/SettingsMenu/ConfirmDelete';
import DeviceList                                     from 'src/Components/SettingsMenu/DeviceList';
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
      <div>
        <AppBar color="default" position="static">
          <Toolbar>
            <IconButton onClick={this.props.closeSettings} className={classes.menuButton} color="inherit" aria-label="Menu">
              <ArrowBackIcon />
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
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <SmartphoneIcon /> &nbsp;&nbsp;&nbsp;
            <Typography className={classes.heading}> Device Settings</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <DeviceList />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <DeleteForeverIcon /> &nbsp;&nbsp;&nbsp;
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
      </div>
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
        this.props.setCurrentUserAction(this.props.authState.authToken);
      }
    })
    .catch((err: any) => {
      alert('Unexpected Error, Please Refresh & Try Again');
      window.location.reload();
    });
  }

}

export default SettingsMenu;