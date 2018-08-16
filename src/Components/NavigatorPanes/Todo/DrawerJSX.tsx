/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import ListItem                                       from '@material-ui/core/ListItem';
import ListItemIcon                                   from '@material-ui/core/ListItemIcon';
import ListItemText                                   from '@material-ui/core/ListItemText';
import ListIcon                                       from '@material-ui/icons/List';

/* This Project */
import { ClickHandlerFunc }                           from 'src/Resources/Generics';

const drawerJSX: ((clickHandler: ClickHandlerFunc, uniqueID: string, key: number) => JSX.Element) = (clickHandler: ClickHandlerFunc, uniqueID: string, key: number) => (
  /*  Change the JSX of how you want your Drawer Element to Look Here.  */
  <ListItem button={true} id={uniqueID} onClick={clickHandler} key={key}>
    <ListItemIcon>
      <ListIcon />
    </ListItemIcon>
    <ListItemText primary="Your Todos" />
  </ListItem>
);

export default drawerJSX;