/* Components/LoginForm/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const loginFormClasses = (theme: Theme) => createStyles({
  buttonsContainer: {
    paddingTop:       15,
    width:            231.5,
  },
  buttonsStyle: {
    marginLeft:       13,
    marginRight:      13,
  },
  close: {
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
  },
  formContainer: {
    width:            227,
  },
  loginContainer: {
    alignItems:       'center',
    display:          'flex',
    justifyContent:   'center',
    paddingTop:       100,
  },
});

interface ILoginFormStyle extends WithStyles<typeof loginFormClasses> {};

export { ILoginFormStyle, loginFormClasses };