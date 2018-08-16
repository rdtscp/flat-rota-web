/* Components/AppNavigator/Types.ts */

/* React/Redux/Other */
// import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { IDrawerHeaderStyle }                         from './Styles';

interface IDrawerHeaderProps {
  currentUser:    Models.User;
  drawerOpen:     boolean;
  toggleSettings: () => void;
}

// interface IAppNavigatorState {
// }

type DrawerHeaderProps = IDrawerHeaderProps & IDrawerHeaderStyle;
type DrawerHeaderState = {} & {}};

export { DrawerHeaderProps, DrawerHeaderState };