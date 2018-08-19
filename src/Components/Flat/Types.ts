/* Components/SettingsMenu/Device/Types.ts */

/* React/Redux/Other */
import { Dispatch }                                   from 'redux';

/* This Project */
import * as Models                                    from "src/Models";

/* This Component */
import { IFlatStyle }                                 from './Styles';

interface IFlatProps {
  flat: Models.Flat;
  setCurrentUserFlats:  (flats: Models.Flat[]) => ((dispatch: Dispatch) => void);
}

interface IFlatState {
  dialogOpen:       boolean;
  newItemDesc:      string;
  newItemName:      string;
  snackbarMessage:  string;
  snackbarOpen:     boolean;
}

type FlatProps = IFlatProps & IFlatStyle;
type FlatState = IFlatState & {};

export { FlatProps, FlatState };