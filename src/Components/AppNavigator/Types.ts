/* Components/AppNavigator/Types.ts */

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { IAppNavigatorStyle }                         from './Styles';

interface IAppNavigatorProps {
  currentUser:          Models.User;
  setCurrentUserAction: () => ((dispatch: Dispatch) => void);
  setCurrentUserFlats:  (flats: Models.Flat[]) => ((dispatch: Dispatch) => void);
}

interface IAppNavigatorState {
  anchorEl:               HTMLElement | null;
  activePane:             string;
  addMembersOpen:         boolean;
  leaveDeleteAlertOpen:   boolean;
  leaveDeleteAlertTitle:  string;
  leaveDeleteAlertType:   string;
  drawerOpen:             boolean;
  drawerWasOpen:          boolean;
  flatListOpen:           boolean;
  settingsOpen:           boolean;
  snackbarMessage:        string;
  snackbarOpen:           boolean;
}

type AppNavigatorProps = IAppNavigatorProps & IAppNavigatorStyle;
type AppNavigatorState = IAppNavigatorState;

export { AppNavigatorProps, AppNavigatorState };