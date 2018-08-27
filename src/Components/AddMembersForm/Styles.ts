/* Components/LoginForm/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const addMembersFormClasses = (theme: Theme) => createStyles({
  button: {
    margin: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  closeSnackbar: {
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
  },
  container: {
    alignItems:     'center',
    display:        'flex',
    flexDirection:  'column',
    flexWrap:       'wrap',
    justifyContent: 'center',
  },
  margin: {
    margin: theme.spacing.unit,
    width: 260,
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    marginTop:      10, 
    paddingBottom:  theme.spacing.unit * 2,
    paddingTop:     theme.spacing.unit * 2,
    width:          260,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

interface IAddMembersFormStyle extends WithStyles<typeof addMembersFormClasses> {};

export { IAddMembersFormStyle, addMembersFormClasses };