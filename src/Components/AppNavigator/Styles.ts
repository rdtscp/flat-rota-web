/* Components/AppNavigator/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const drawerWidth = 310;

const appNavigatorClasses = (theme: Theme) => createStyles({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    position: 'absolute',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.primary.main,
  },
  drawerPaper: {
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    width: drawerWidth,
  },
  drawerTitle: {
    marginLeft: 24,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
    zIndex:1,
  },
  settingsPopup: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1201,
  },
  toolbar: theme.mixins.toolbar,
});

interface IAppNavigatorStyle extends WithStyles<typeof appNavigatorClasses> {};

export { appNavigatorClasses, IAppNavigatorStyle };