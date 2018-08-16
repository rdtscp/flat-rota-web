/* Components/SettingsMenu/ConfirmDelete/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const confirmDeleteClasses = (theme: Theme) => createStyles({
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  root: {
    width: '90%',
  },
});

interface IConfirmDeleteStyle extends WithStyles<typeof confirmDeleteClasses> {};

export { confirmDeleteClasses, IConfirmDeleteStyle };