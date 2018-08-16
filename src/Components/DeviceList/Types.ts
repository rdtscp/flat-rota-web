/* Components/SettingsMenu/DeviceList/Types.ts */  //

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { IDeviceListStyle }                           from './Styles';

interface IDeviceListProps {
  authState:            Models.AuthStateType;
  devices:              Models.Device[];
  setAuthStateAction:   (authToken: string) => ((dispatch: Dispatch) => void);
  setCurrentUserAction: (authToken: string) => ((dispatch: Dispatch) => void);
}

interface IDeviceListState {
  confirmationAlertOpen:    boolean;
  confirmationSnackbarOpen: boolean;
  deviceToLogoutAuthToken:  string;
  deviceToLogoutID:         string;
  deviceToLogoutString:     string;
}

type DeviceListProps = IDeviceListProps & IDeviceListStyle;
type DeviceListState = {} & IDeviceListState

export { DeviceListProps, DeviceListState };