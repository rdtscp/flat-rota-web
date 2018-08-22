/* Components/SettingsMenu/DeviceList/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const todoListClasses = (theme: Theme) => createStyles({
  close: {
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
  },
  closeSnackbar: {
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
  },
  todoContainer: {
    alignItems:       'center',
    display:          'flex',
    justifyContent:   'center',
  },
});

interface ITodoListStyle extends WithStyles<typeof todoListClasses> {};

export { todoListClasses, ITodoListStyle };