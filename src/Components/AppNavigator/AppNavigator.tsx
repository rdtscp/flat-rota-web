/* Components/AppNavigator/AppNavigator.tsx */

/* React/Redux/Other */
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
import ExpandLessIcon                                 from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon                                 from '@material-ui/icons/ExpandMore';
import HomeIcon                                       from '@material-ui/icons/Home';
import MenuIcon                                       from '@material-ui/icons/Menu';
import SettingsRoundedIcon                            from '@material-ui/icons/SettingsRounded';

/* This Project */
import generatePanes                                  from 'src/Components/NavigatorPanes';
import SettingsMenu                                   from 'src/Components/SettingsMenu';
import * as Models                                    from "src/Models";

/* This Component */
import { AppNavigatorProps, AppNavigatorState }       from './Types';

class AppNavigator extends React.Component<AppNavigatorProps, AppNavigatorState> {

  constructor(props: AppNavigatorProps) {
    super(props);
    const initNavigatorPanes = generatePanes(this.clickPane);
    this.state = {
      activePane:       initNavigatorPanes[0],
      drawerOpen:       false,
      drawerWasOpen:    true,
      flatListOpen:     false,
      navigatorPanes:   initNavigatorPanes,
      settingsOpen:     false,
    };
  }

  public render() {
    const { classes, currentUser } = this.props;
    
    const drawer = (
      <div>
        <div className={(this.state.drawerOpen) ? classes.drawerHeader : classes.toolbar}>
          <Typography variant="title" color="inherit" noWrap={true}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <p className={classes.drawerTitle} style={{flexGrow: 1, color: (this.state.drawerOpen)?'white':'black'}}>
                {currentUser.username}
              </p>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                style={{margin: 9, color: (this.state.drawerOpen) ? 'white' : 'black'}}
                onClick={this.toggleSettings}
              >
                <SettingsRoundedIcon />
              </IconButton>
            </div>
          </Typography>
        </div>
        <Divider />
        <List subheader={<ListSubheader component="div">Your Account</ListSubheader>}>
          <div>
            {this.state.navigatorPanes.map((navigatorPane: Models.NavigatorPane, index: number) => navigatorPane.getDrawer(index)) }
          </div>
          <Divider />
          <ListItem button={true} onClick={this.toggleFlatList}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText inset={true} primary="Flat Groups" />
            {this.state.flatListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={this.state.flatListOpen} timeout="auto" unmountOnExit={true}>
            <List component="div" disablePadding={true}>
              <ListItem button={true} className={classes.nested}>
                <ListItemText inset={true} primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <Slide direction="up" in={this.state.settingsOpen} mountOnEnter={true} unmountOnExit={true}>
          <div className={classes.settingsPopup}>
            <SettingsMenu closeSettings={this.toggleSettings} />
          </div>
        </Slide>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.drawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap={true}>
              {this.state.activePane.paneTitle}</Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp={true}>
          <Drawer
            variant="temporary"
            anchor={'left'}
            open={this.state.drawerOpen}
            onClose={this.drawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown={true} implementation="css">
          <Drawer
            variant="permanent"
            open={true}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Typography variant="title" gutterBottom={true}>
              {this.state.activePane.paneElement}
            </Typography>
        </main>
      </div>
    );

  }

  private drawerToggle = () => {
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

  private clickPane = (event: React.MouseEvent<HTMLElement>) => {
    const paneClicked = event.currentTarget.id;
    const activePane  = this.state.navigatorPanes.filter((pane: Models.NavigatorPane) => pane.selectorID === paneClicked)[0];
    this.setState({
      activePane,
      drawerOpen:     false,
      drawerWasOpen:  false,
    });
  }

  private toggleFlatList = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      flatListOpen: !this.state.flatListOpen
    });
  }
  
}

export default AppNavigator;