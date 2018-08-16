/* Components/AppNavigator/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const drawerHeaderClasses = (theme: Theme) => createStyles({
  drawerTitle: {
    flexGrow: 1,
    marginLeft: 24,
  },
  mobileDrawer: {
    backgroundColor: theme.palette.primary.main,
  },
  settingsContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  toolbar: theme.mixins.toolbar,
});

interface IDrawerHeaderStyle extends WithStyles<typeof drawerHeaderClasses> {};

export { drawerHeaderClasses, IDrawerHeaderStyle };