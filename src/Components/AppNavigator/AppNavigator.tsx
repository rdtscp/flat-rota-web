/* Components/AppNavigator/AppNavigator.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import * as UI                                        from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import * as Components                                from 'src/Components';
import * as Models                                    from "src/Models";

/* This Component */
import { AppNavigatorProps, AppNavigatorState }       from './Types';

class AppNavigator extends React.Component<AppNavigatorProps, AppNavigatorState> {

  constructor(props: AppNavigatorProps) {
    super(props);

    this.state = {
      activePane:         'yourTodos',
      anchorEl:           null,
      drawerOpen:         false,
      drawerWasOpen:      true,
      flatListOpen:       false,
      settingsOpen:       false,
      snackbarMessage:    '',
      snackbarOpen:       false,
    };
  }

  public render() {
    const { classes, currentUser } = this.props;
    const { activePane, drawerOpen, flatListOpen, settingsOpen } = this.state;
    
    const flatOptsOpen = Boolean(this.state.anchorEl);

    const drawer = (
      <React.Fragment>
        <Components.DrawerHeader drawerOpen={drawerOpen} toggleSettings={this.toggleSettings} />
        <UI.List subheader={<UI.ListSubheader component="div">Your Account</UI.ListSubheader>}>
          <UI.ListItem id="createFlat" onClick={this.clickDrawer} button={true}>
            <UI.ListItemIcon>
              <Icons.AddCircle />
            </UI.ListItemIcon>
            <UI.ListItemText primary="Create New Flat" />
          </UI.ListItem>
          <UI.ListItem id="yourTodos"  onClick={this.clickDrawer} button={true}>
            <UI.ListItemIcon>
              <Icons.List />
            </UI.ListItemIcon>
            <UI.ListItemText primary="Your Todos" />
          </UI.ListItem>
          <UI.Divider />
          <UI.ListItem button={true} onClick={this.toggleFlatList}>
            <UI.ListItemIcon>
              <Icons.Home />
            </UI.ListItemIcon>
            <UI.ListItemText inset={true} primary="Flats" />
            {flatListOpen ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
          </UI.ListItem>
          <UI.Collapse in={flatListOpen} timeout="auto" unmountOnExit={true}>
            <UI.List component="div" disablePadding={true}>
              {currentUser.flats.map((flat: Models.Flat, index: number) => (
                <UI.ListItem id={flat.id} onClick={this.clickDrawer} key={index} className={classes.nested} button={true}>
                  <UI.ListItemIcon>
                    <Icons.LocationOn />
                  </UI.ListItemIcon>
                  <UI.ListItemText primary={flat.name} />
                </UI.ListItem>
              ))}
            </UI.List>
          </UI.Collapse>
        </UI.List>
      </React.Fragment>
    );

    let paneTitle;
    let paneContent;
    if (activePane === 'yourTodos') {
      paneTitle   = "Your Todos";
      paneContent = (
        <React.Fragment>
          <Components.TodoList />
        </React.Fragment>
      );
    }
    else if (activePane === 'createFlat') {
      paneTitle   = "Create New Flat";
      paneContent = (
        <React.Fragment>
          <Typography variant="title" gutterBottom={true}>
            <Components.FlatForm closeFlatList={this.closeFlatList} />
          </Typography>
        </React.Fragment>
      );
    }
    else {
      const currentFlat = this.getFlatByID(activePane);
      paneTitle   = currentFlat.name;
      paneContent = (<Components.Flat flat={currentFlat} />);
    }

    return (
      <div className={classes.root}>
        <Slide direction="up" in={settingsOpen} mountOnEnter={true} unmountOnExit={true}>
          <div className={classes.settingsPopup}>
            <Components.SettingsMenu closeSettings={this.toggleSettings} />
          </div>
        </Slide>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer} className={classes.navIconHide}>
              <UIIcons.Menu />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap={true} style={{flexGrow: 1}}>
              {paneTitle}
            </Typography>
            {(activePane !== 'yourTodos' && activePane !== 'createFlat') ? (
              <React.Fragment>
                <IconButton color="inherit" onClick={this.addMembersFlat}>
                  <UIIcons.GroupAdd /> 
                </IconButton>
                <div>
                  <IconButton
                    aria-owns={flatOptsOpen ? 'menu-appbar' : ''}
                    aria-haspopup="true"
                    onClick={this.openFlatOptions}
                    color="inherit"
                    >
                    <UIIcons.Warning />
                  </IconButton>
                  <Menu id="menu-appbar" anchorEl={this.state.anchorEl} anchorOrigin={{ horizontal: 'right', vertical: 'top', }} transformOrigin={{ horizontal: 'right', vertical: 'top', }} open={flatOptsOpen} onClose={this.clickFlatOption} >
                    <MenuItem id="leave" onClick={this.clickFlatOption}>Leave Flat</MenuItem>
                    <MenuItem id="destroy"  onClick={this.clickFlatOption}>Delete Flat</MenuItem>
                  </Menu>
                </div>
              </React.Fragment>
            ) : null}
          </Toolbar>
        </AppBar>
        <Hidden mdUp={true}>
          <Drawer variant="temporary" anchor={'left'} open={drawerOpen} onClose={this.toggleDrawer} classes={{paper: classes.drawerPaper}} ModalProps={{keepMounted: true}} >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown={true} implementation="css">
          <Drawer variant="permanent" open={true} classes={{paper: classes.drawerPaper}} >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.paneContainer}>
          <div className={classes.toolbar} />
          {paneContent}
        </main>
        <Snackbar
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.hideSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          TransitionComponent={Fade}
          action={[
            <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.closeSnackbar}
            onClick={this.hideSnackbar}
            >
              <UIIcons.Close />
            </IconButton>,
          ]}
        />
      </div>
    );

  }

  private clickDrawer = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      activePane: event.currentTarget.id,
      drawerOpen: false,
    });
  }

  private getFlatByID = (id: string) => {
    return this.props.currentUser.flats.filter((flat) => (flat.id === id))[0];
  }

  /* Toggle UI Components */
  private toggleDrawer = () => {
    this.setState(state => ({
      drawerOpen:     !state.drawerOpen,
      drawerWasOpen:  !state.drawerOpen,
    }));
  };
  private toggleSettings = () => {
    this.props.setCurrentUserAction();
    if (this.state.settingsOpen === true) {
      this.setState({
        drawerOpen:   this.state.drawerWasOpen,
        settingsOpen: false,
      })
    }
    else if (this.state.drawerOpen) {
      this.setState({
        drawerOpen:     false,
        drawerWasOpen:  true,
        settingsOpen:   true
      });
    }
    else {
      this.setState({
        drawerOpen:     false,
        drawerWasOpen:  false,
        settingsOpen:   true,  
      })
    }
  };
  private closeFlatList = () => {
    this.setState({ flatListOpen: false });
  }
  private toggleFlatList = () => {
    const populatedFlats: Array<Promise<Models.Flat | null>> = this.props.currentUser.flats.map((flat: Models.Flat) => 
    Models.FlatAPI.get(flat.id)
      .then((data: Models.FlatResponseData) => data.content)
      .catch(error => null)
    );
    Promise.all(populatedFlats)
    .then(flats => {
      this.props.setCurrentUserFlats(flats as Models.Flat[]);
    })
    this.setState({
      flatListOpen: !this.state.flatListOpen
    });
  }
  private openFlatOptions = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  private addMembersFlat  = (event: React.MouseEvent<HTMLElement>) => {
    alert('Popup to Handle Adding Members to Flat: ' + this.state.activePane);
  }
  private clickFlatOption = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.id !== '') {
      if (event.currentTarget.id === 'leave') {
        Models.FlatAPI.leave(this.state.activePane)
        .then((leaveData: Models.FlatResponseData) => {
          if (leaveData.message !== null) {
            this.showSnackbar(leaveData.message);
          }
          this.props.setCurrentUserAction();
          this.setState({
            activePane: 'yourTodos',
            flatListOpen: false,
          });
        })
        .catch((leaveData: Models.UserResponseData) => {
          if (leaveData.message !== null) {
            this.showSnackbar(leaveData.message);
          }
          this.props.setCurrentUserAction();
          this.setState({
            activePane: 'yourTodos',
            flatListOpen: false,
          });
        });
      }
      else if (event.currentTarget.id === 'destroy') {
        Models.FlatAPI.destroy(this.state.activePane)
        .then((deleteData: Models.FlatResponseData) => {
          if (deleteData.message !== null) {
            this.showSnackbar(deleteData.message);
          }
          this.props.setCurrentUserAction();
          this.setState({
            activePane: 'yourTodos',
            flatListOpen: false,
          });
        })
        .catch((deleteData: Models.UserResponseData) => {
          if (deleteData.message !== null) {
            this.showSnackbar(deleteData.message);
          }
          this.props.setCurrentUserAction();
          this.setState({
            activePane: 'yourTodos',
            flatListOpen: false,
          });
        });
      }
      else {
        alert('Clicked Flat Option: ' + event.currentTarget.id + ' for flat: ' + this.state.activePane);
      }
    }      
    this.setState({ anchorEl: null });
  }

  private showSnackbar = (message: string) => {
    this.setState({
      snackbarMessage: message,
      snackbarOpen: true,
    });
  };

  private hideSnackbar = () => {
    this.setState({
      snackbarOpen: false
    });
  };
  
}

export default AppNavigator;