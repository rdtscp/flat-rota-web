/* Components/SettingsMenu/Device/index.ts */

/* Material-UI */
import withStyles                                     from '@material-ui/core/styles/withStyles';

/* This Component */
import Device                                         from './Device';
import { deviceClasses }                              from './Styles';

export default withStyles(deviceClasses)(Device);