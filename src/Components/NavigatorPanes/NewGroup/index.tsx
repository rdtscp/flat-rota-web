/* React/Redux/Other */
import * as React                                     from 'react';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import drawerJSX                                      from './DrawerJSX';
import NewGroupPane                                   from './NewGroupPane';

/* Change your Pane Title */
const paneTitle       = 'Create New Flat Group';

/* Change paneElement to an instance of your Component */
const drawerElement   = drawerJSX;
export const newGroupPane: Models.NavigatorJSXGenerator = {
  drawerElement,
  paneElement: (<NewGroupPane />),
  paneTitle,
};