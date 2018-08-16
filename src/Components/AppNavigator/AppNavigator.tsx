/* Components/AppNavigator/AppNavigator.tsx */

/* React/Redux/Other */
// import classNames                                     from 'classnames';
import * as React                                     from 'react';

/* Material-UI */
import AppBar                                         from '@material-ui/core/AppBar';
import Collapse                                       from '@material-ui/core/Collapse';
import Divider                                        from '@material-ui/core/Divider';
import Drawer                                         from '@material-ui/core/Drawer';
import Hidden                                         from '@material-ui/core/Hidden';
import IconButton                                     from '@material-ui/core/IconButton';
import List                                           from '@material-ui/core/List';
import ListItem                                       from '@material-ui/core/ListItem';
import ListItemIcon                                   from '@material-ui/core/ListItemIcon';
import ListItemText                                   from '@material-ui/core/ListItemText';
import ListSubheader                                  from '@material-ui/core/ListSubheader';
import Slide                                          from '@material-ui/core/Slide';
import Toolbar                                        from '@material-ui/core/Toolbar';
import Typography                                     from '@material-ui/core/Typography';
import AddCircleIcon                                  from '@material-ui/icons/AddCircle';
import ExpandLessIcon                                 from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon                                 from '@material-ui/icons/ExpandMore';
import HomeIcon                                       from '@material-ui/icons/Home';
import ListIcon                                       from '@material-ui/icons/List';
import LocationOnIcon                                 from '@material-ui/icons/LocationOn';
import MenuIcon                                       from '@material-ui/icons/Menu';

/* This Project */
import DrawerHeader                                   from 'src/Components/DrawerHeader';
import Flat                                           from 'src/Components/Flat';
import FlatForm                                       from 'src/Components/FlatForm';
import SettingsMenu                                   from 'src/Components/SettingsMenu';
import TodoList                                       from 'src/Components/TodoList';
import * as Models                                    from "src/Models";

/* This Component */
import { AppNavigatorProps, AppNavigatorState }       from './Types';

class AppNavigator extends React.Component<AppNavigatorProps, AppNavigatorState> {

  constructor(props: AppNavigatorProps) {
    super(props);

    this.state = {
      activePane:         'yourTodos',
      drawerOpen:         false,
      drawerWasOpen:      true,
      flatListOpen:       false,
      settingsOpen:       false,
    };
  }

  public render() {
    const { classes, currentUser } = this.props;
    const { activePane, drawerOpen, flatListOpen, settingsOpen } = this.state;
    
    const drawer = (
      <React.Fragment>
        <DrawerHeader drawerOpen={drawerOpen} toggleSettings={this.toggleSettings} />
        <List subheader={<ListSubheader component="div">Your Account</ListSubheader>}>
          <ListItem id="createFlat" onClick={this.clickDrawer} button={true}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create New Flat" />
          </ListItem>
          <ListItem id="yourTodos"  onClick={this.clickDrawer} button={true}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Your Todos" />
          </ListItem>
          <Divider />
          <ListItem button={true} onClick={this.toggleFlatList}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText inset={true} primary="Flats" />
            {flatListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={flatListOpen} timeout="auto" unmountOnExit={true}>
            <List component="div" disablePadding={true}>
              {currentUser.flats.map((flat: Models.Flat, index: number) => (
                <ListItem id={flat.id} onClick={this.clickDrawer} key={index} className={classes.nested} button={true}>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary={flat.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </React.Fragment>
    );

    const paneTitle = "Pane Title";

    let paneContent;
    if (activePane === 'yourTodos') {
      paneContent = (
        <React.Fragment>
            <TodoList />
        </React.Fragment>
      );
    }
    else if (activePane === 'createFlat') {
      paneContent = (
        <React.Fragment>
          <FlatForm />
        </React.Fragment>
      );
    }
    else {
      const currentFlat = currentUser.flats.filter((flat) => (flat.id === activePane))[0];
      paneContent = (
        <React.Fragment>
            <Flat flat={currentFlat} />
        </React.Fragment>
      );
    }

    return (
      <div className={classes.root}>
        <Slide direction="up" in={settingsOpen} mountOnEnter={true} unmountOnExit={true}>
          <div className={classes.settingsPopup}>
            <SettingsMenu closeSettings={this.toggleSettings} />
          </div>
        </Slide>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer} className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap={true}>
              {paneTitle}
            </Typography>
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
          <Typography variant="title" gutterBottom={true}>
            {paneContent}
          </Typography>
        </main>
      </div>
    );

  }

  private clickDrawer = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      activePane: event.currentTarget.id
    });
  }

  /* Toggle UI Components */
  private toggleDrawer = () => {
    this.setState(state => ({
      drawerOpen:     !state.drawerOpen,
      drawerWasOpen:  !state.drawerOpen,
    }));
  };
  private toggleSettings = () => {
    this.props.setCurrentUserAction(this.props.authState.authToken);
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
        settingsOpen: true
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
  private toggleFlatList = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      flatListOpen: !this.state.flatListOpen
    });
  }
  
}

export default AppNavigator;