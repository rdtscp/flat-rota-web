/* Components/SettingsMenu/Device/Types.ts */

/* This Project */
import * as Models                                    from "src/Models";

/* This Component */
import { IFlatStyle }                                 from './Styles';

interface IFlatProps {
  flat: Models.Flat;
}

// interface IFlatState {
// }

type FlatProps = IFlatProps & IFlatStyle;
type FlatState = {} & {};

export { FlatProps, FlatState };