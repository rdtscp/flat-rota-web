/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import * as UI                                        from '@material-ui/core';

/* This Component */
import { DeviceProps, DeviceState }                   from './Types';

class Device extends React.Component<DeviceProps, DeviceState> {

  constructor(props: DeviceProps) {
    super(props);
    this.state = {
      lastActiveContent: (this.props.thisDevice) ? 'This Device' : this.props.lastUsed,
    }
  }

  public render() {
    const { classes } = this.props;
    
    let lastActiveClass: string = "";
    if (this.props.thisDevice) {
      lastActiveClass   = classes.activeDevice;
    }

    return (
      <UI.Paper className={classes.root} elevation={5}>
        <UI.Typography variant="title" >
          {this.props.userAgentStr}
        </UI.Typography>
        <UI.Typography className={lastActiveClass} variant="subheading">
          <UI.Button onClick={this.handleLogoutClick} variant="contained" color="primary" >Logout</UI.Button>  &nbsp;&nbsp;        
          {this.state.lastActiveContent} 
        </UI.Typography>
      </UI.Paper>
    );
  }

  private handleLogoutClick = () => {
    const logoutWarning: string = this.props.userAgentStr + ((this.props.thisDevice) ? ', which is this Device' : ' last active on ' + this.state.lastActiveContent);
    this.props.logout(this.props.id, this.props.authToken, logoutWarning);
  }

}

export default Device;