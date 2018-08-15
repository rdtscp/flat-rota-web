/* App/Theme.ts */

/* Material-UI */
import blue                                           from '@material-ui/core/colors/blue';
import red                                            from '@material-ui/core/colors/red';
import { createMuiTheme }                             from '@material-ui/core/styles';

const appTheme = createMuiTheme({
  palette: {
    primary:    blue,
    secondary:  red,
    
  },
});

export { appTheme };