/* Components/SettingsMenu/DeviceList/Styles.ts */

/* Material-UI */
import { createStyles }                               from '@material-ui/core';
import { Theme }                                      from '@material-ui/core/styles';
import { WithStyles }                                 from '@material-ui/core/styles/withStyles';

const deviceListClasses = (theme: Theme) => createStyles({
  close: {
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
  },
  devicesContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    maxWidth: 355,
    minWidth: 327,
  },
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {},
});

interface IDeviceListStyle extends WithStyles<typeof deviceListClasses> {};

export { deviceListClasses, IDeviceListStyle };