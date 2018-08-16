/* React/Redux/Other */
import * as React                                     from 'react';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import drawerJSX                                      from './DrawerJSX';
import TodoPane                                       from './TodoPane/';

/* Change your Pane Title */
const paneTitle       = 'Your Todo\'s';

/* Change paneElement to an instance of your Component */
const drawerElement   = drawerJSX;
export const todoPane: Models.NavigatorJSXGenerator = {
  drawerElement,
  paneElement: (<TodoPane />),
  paneTitle,
};