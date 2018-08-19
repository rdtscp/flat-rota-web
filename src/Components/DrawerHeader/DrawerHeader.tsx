/* Components/AppNavigator/AppNavigator.tsx */

/* React/Redux/Other */
import classNames                                     from 'classnames';
import * as React                                     from 'react';

/* Material-UI */

import { IconButton, Typography }                     from '@material-ui/core';
import SettingsRoundedIcon                            from '@material-ui/icons/SettingsRounded';

/* This Component */
import { DrawerHeaderProps, DrawerHeaderState }       from './Types';

class DrawerHeader extends React.Component<DrawerHeaderProps, DrawerHeaderState> {

  public render() {
    const { classes, currentUser, drawerOpen } = this.props;
    return (
      <div className={classNames(classes.toolbar, (drawerOpen) ? classes.mobileDrawer : null)}>
        <Typography variant="title" color="inherit" noWrap={true}>
          <div className={classes.settingsContainer}>
            <p className={classes.drawerTitle} style={{color: (drawerOpen)?'white':'black'}}>
              {currentUser.username}
            </p>
            <IconButton color="inherit" aria-label="Open drawer" style={{margin: 9, color: (drawerOpen) ? 'white' : 'black'}} onClick={this.props.toggleSettings}>
              <SettingsRoundedIcon />
            </IconButton>
          </div>
        </Typography>
      </div>
    );

  }
  
}

export default DrawerHeader;