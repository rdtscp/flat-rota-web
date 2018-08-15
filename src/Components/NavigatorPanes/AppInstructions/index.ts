/* This Project */
import * as Models                                    from 'src/Models/';

/* This Component */
import drawerJSX                                      from './DrawerElement';
import paneJSX                                        from './PaneElement';


/* Change your Pane Title */
const paneTitle       = 'App Instructions';

/* Do NOT Change */
const drawerElement   = drawerJSX;
const paneElement     = paneJSX;

/* ONLY change the Variable Name of what you want your Pane to be called */
export const AppInstructions: Models.NavigatorJSXGenerator = {
  drawerElement,
  paneElement,
  paneTitle,
};