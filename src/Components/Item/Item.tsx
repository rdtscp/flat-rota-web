/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React from 'react';

/* Material-UI */
import { Card, CardContent, IconButton, Menu, MenuItem, Typography
}                                                     from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';


/* This Component */
import { ItemProps, ItemState }                       from './Types';

class Flat extends React.Component<ItemProps, ItemState> {

  constructor(props: ItemProps) {
    super(props);
    this.state = {
      anchorEl:   null,
      showName:   true,
    };
  }

  public render() {
    const { classes, item } = this.props;

    const itemOptsOpen = Boolean(this.state.anchorEl);

    return (
      <Card className={classes.card}>
        <div className={classes.itemContainer}>
          <CardContent className={classes.itemText} onClick={this.toggleContent}>
            <Typography variant={(this.state.showName) ? "headline" : "subheading"}>{(this.state.showName) ? item.name : item.description}</Typography>
          </CardContent>
          <div className={classes.itemControls}>
            <IconButton aria-label="Mark Bought">
              <Icons.Done />
            </IconButton>
            <IconButton aria-label="Notify Runout">
              <Icons.NotificationsActive />
            </IconButton>
            <IconButton aria-label="Item Options" aria-haspopup="true" aria-owns={itemOptsOpen ? 'menu-appbar' : ''}  onClick={this.openItemOptions}>
              <Icons.MoreHoriz />
            </IconButton>
            <Menu color="inherit" id="menu-appbar" anchorEl={this.state.anchorEl} anchorOrigin={{ horizontal: 'right', vertical: 'top', }} transformOrigin={{ horizontal: 'right', vertical: 'top', }} open={itemOptsOpen} onClose={this.clickItemOption} >
              <MenuItem id="updateItem" onClick={this.clickItemOption}>Update Info</MenuItem>
              <MenuItem id="deleteItem"  onClick={this.clickItemOption}>Delete Item</MenuItem>
            </Menu>
          </div>
        </div>
      </Card>
    );
  }

  private toggleContent = () => {
    this.setState({
      showName: !this.state.showName
    });
  }

  private openItemOptions = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  private clickItemOption = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.id !== '') {
      alert('Clicked Item Option: ' + event.currentTarget.id + ' for item: ' + this.props.item.name);
    }      
    this.setState({ anchorEl: null });
  }

}

export default Flat;