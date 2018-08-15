/* Components/SettingsMenu/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const settingsMenuClasses = (theme: Theme) => createStyles({
  deleteAccountContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    maxWidth: 355,
    minWidth: 327,
  },
  flex: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

interface ISettingsMenuStyle extends WithStyles<typeof settingsMenuClasses> {};

export { settingsMenuClasses, ISettingsMenuStyle };