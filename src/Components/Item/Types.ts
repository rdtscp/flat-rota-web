/* Components/SettingsMenu/Device/Types.ts */

// /* React/Redux/Other */
// import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from "src/Models";

/* This Component */
import { IItemStyle }                                 from './Styles';

interface IItemProps {
  item: Models.Item;
}

interface IItemState {
  anchorEl:       HTMLElement | null;
  showName:       boolean;
}

type ItemProps = IItemProps & IItemStyle;
type ItemState = IItemState & {};

export { ItemProps, ItemState };