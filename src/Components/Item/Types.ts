/* Components/SettingsMenu/Device/Types.ts */

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from "src/Models";

/* This Component */
import { IItemStyle }                                 from './Styles';

interface IItemProps {
  currentUser:            Models.User;
  item:                   Models.Item;
  flat:                   Models.Flat;
  setCurrentUserFlats:    (flats: Models.Flat[]) => ((dispatch: Dispatch) => void);
}

interface IItemState {
  anchorEl:       HTMLElement | null;
  showName:       boolean;
}

type ItemProps = IItemProps & IItemStyle;
type ItemState = IItemState & {};

export { ItemProps, ItemState };