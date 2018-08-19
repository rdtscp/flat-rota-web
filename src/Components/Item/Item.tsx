/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React from 'react';

/* Material-UI */
import { Button, Card, CardContent, Dialog, DialogActions, DialogTitle, IconButton, Menu, MenuItem, Typography
}                                                     from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { ItemProps, ItemState }                       from './Types';

class Item extends React.Component<ItemProps, ItemState> {

  constructor(props: ItemProps) {
    super(props);
    this.state = {
      anchorEl:                     null,
      confirmationDeleteItemOpen:   false,
      item:                         this.props.item,
      showName:                     true,
    };
  }

  public render() {
    const { classes, currentUser, item } = this.props;
    const itemOptsOpen = Boolean(this.state.anchorEl);

    const rota = JSON.parse(item.rota);
    return (
      <Card className={classes.card}>
        <div className={classes.itemContainer}>
          <CardContent className={classes.itemText} onClick={this.toggleContent}>
            <Typography variant={(this.state.showName) ? "headline" : "subheading"}>{(this.state.showName) ? item.name : item.description}</Typography>
          </CardContent>
          <div className={classes.itemControls}>
            <IconButton onClick={this.clearItem} aria-label="Mark Bought">
              <Icons.Done />
            </IconButton>
            <IconButton onClick={this.bumpItem} color={(item.notification)? ((currentUser.id === rota[0]) ? "secondary" : "primary") : "default"} aria-label="Notify Runout">
              <Icons.NotificationsActive />
            </IconButton>
            <IconButton aria-label="Item Options" aria-haspopup="true" aria-owns={itemOptsOpen ? 'menu-appbar' : ''}  onClick={this.openItemOptions}>
              <Icons.MoreHoriz />
            </IconButton>
            <Menu color="inherit" id="menu-appbar" anchorEl={this.state.anchorEl} anchorOrigin={{ horizontal: 'right', vertical: 'top', }} transformOrigin={{ horizontal: 'right', vertical: 'top', }} open={itemOptsOpen} onClose={this.clickItemOption} >
              <MenuItem id="updateItem" onClick={this.updateItem}>Update Info</MenuItem>
              <MenuItem id="deleteItem" onClick={this.toggleDeleteItemDialog}>Delete Item</MenuItem>
            </Menu>
          </div>
        </div>
        <Dialog
          open={this.state.confirmationDeleteItemOpen}
          onClose={this.toggleDeleteItemDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete Item"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.toggleDeleteItemDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteItem} color="primary" autoFocus={true}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }


  private toggleDeleteItemDialog = () => {
    this.setState({
      confirmationDeleteItemOpen: !this.state.confirmationDeleteItemOpen
    });
  }

  private clearItem = () => {
    //                                                               notif  bump
    Models.ItemAPI.setStatus(this.props.item.id, this.props.flat.id, false)
    .then((data: Models.ItemResponseData) => {
      const populatedFlats: Array<Promise<Models.Flat | null>> = this.props.currentUser.flats.map((flat: Models.Flat) => 
        Models.FlatAPI.get(flat.id)
        .then((flatData: Models.FlatResponseData) => flatData.content)
        .catch(err => null)
      );
      Promise.all(populatedFlats)
      .then(flats => {
        this.props.setCurrentUserFlats(flats as Models.Flat[]);
      });
    })
    .catch(error => null);
  }

  private bumpItem = () => {
    const { currentUser, item } = this.props;
    const rota = JSON.parse(item.rota);
    if (currentUser.id === rota[0] && item.notification) {
      this.props.showSnackbar('It is your turn for this item!');
      return;
    }
    //                                                               notif  bump
    Models.ItemAPI.setStatus(this.props.item.id, this.props.flat.id, true)
    .then((data: Models.ItemResponseData) => {
      const populatedFlats: Array<Promise<Models.Flat | null>> = this.props.currentUser.flats.map((flat: Models.Flat) => 
        Models.FlatAPI.get(flat.id)
        .then((flatData: Models.FlatResponseData) => flatData.content)
        .catch(err => null)
      );
      Promise.all(populatedFlats)
      .then(flats => {
        this.props.setCurrentUserFlats(flats as Models.Flat[]);
      });
    })
    .catch(error => null);
  }

  private updateItem = () => {
    this.props.showSnackbar('Coming Soon...');
    this.setState({ anchorEl: null });
  }

  private deleteItem = () => {
    this.setState({ confirmationDeleteItemOpen: false });
    Models.ItemAPI.destroy(this.props.item.id)
    .then(({ error, warning, message, content }: Models.ItemResponseData) => {
      this.setState({ anchorEl: null });
      const populatedFlats: Array<Promise<Models.Flat | null>> = this.props.currentUser.flats.map((flat: Models.Flat) => 
        Models.FlatAPI.get(flat.id)
        .then((data: Models.FlatResponseData) => data.content)
        .catch(err => null)
      );
      Promise.all(populatedFlats)
      .then(flats => {
        this.props.setCurrentUserFlats(flats as Models.Flat[]);
      });
    })
    .catch(err => null);
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
    this.setState({ anchorEl: null });
  }

}

export default Item;