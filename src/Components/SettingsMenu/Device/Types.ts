/* Components/SettingsMenu/Device/Types.ts */

/* This Component */
import { IDeviceStyle }                               from './Styles';

interface IDeviceProps {
  authToken:    string;
  id:           string;
  key:          number;
  lastUsed:     string;
  logout:       (deviceID: string, deviceAuthToken: string, deviceString: string) => void;
  thisDevice:   boolean;
  userAgentStr: string;
}

interface IDeviceState {
  lastActiveContent: string;
}

type DeviceProps = IDeviceProps & IDeviceStyle;
type DeviceState = IDeviceState;

export { DeviceProps, DeviceState };