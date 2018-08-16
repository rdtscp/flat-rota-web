/* Components/AppNavigator/Types.ts */

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { IAppNavigatorStyle }                         from './Styles';

interface IAppNavigatorProps {
  authState:            Models.AuthStateType;
  currentUser:          Models.User;
  setCurrentUserAction: (authToken: string) => ((dispatch: Dispatch) => void);
}

interface IAppNavigatorState {
  activePane:     string;
  drawerOpen:     boolean;
  drawerWasOpen:  boolean;
  flatListOpen:   boolean;
  settingsOpen:   boolean;
}

type AppNavigatorProps = IAppNavigatorProps & IAppNavigatorStyle;
type AppNavigatorState = IAppNavigatorState;

export { AppNavigatorProps, AppNavigatorState };