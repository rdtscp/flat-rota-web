/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React from 'react';

/* Material-UI */
import { Card, CardContent, IconButton, Menu, MenuItem, Typography
}                                                     from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import * as Models                                    from 'src/Models';

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
            <IconButton onClick={this.clearItem} aria-label="Mark Bought">
              <Icons.Done />
            </IconButton>
            <IconButton onClick={this.bumpItem} aria-label="Notify Runout">
              <Icons.NotificationsActive />
            </IconButton>
            <IconButton aria-label="Item Options" aria-haspopup="true" aria-owns={itemOptsOpen ? 'menu-appbar' : ''}  onClick={this.openItemOptions}>
              <Icons.MoreHoriz />
            </IconButton>
            <Menu color="inherit" id="menu-appbar" anchorEl={this.state.anchorEl} anchorOrigin={{ horizontal: 'right', vertical: 'top', }} transformOrigin={{ horizontal: 'right', vertical: 'top', }} open={itemOptsOpen} onClose={this.clickItemOption} >
              <MenuItem id="updateItem" onClick={this.updateItem}>Update Info</MenuItem>
              <MenuItem id="deleteItem" onClick={this.deleteItem}>Delete Item</MenuItem>
            </Menu>
          </div>
        </div>
      </Card>
    );
  }

  private clearItem = () => {
    alert('Clearing Item');
    Models.ItemAPI.setStatus(this.props.item.id, this.props.flat.id, true, false)
    .then((data: Models.ItemResponseData) => {
      // tslint:disable-next-line:no-console
      console.log(data);
    })
    .catch(error => {
      // tslint:disable-next-line:no-console
      console.log(error);
    });
  }

  private bumpItem = () => {
    alert('Bumping Item');
    Models.ItemAPI.setStatus(this.props.item.id, this.props.flat.id, false, true)
    .then((data: Models.ItemResponseData) => {
      // tslint:disable-next-line:no-console
      console.log(data);
    })
    .catch(error => {
      // tslint:disable-next-line:no-console
      console.log(error);
    });
  }

  private updateItem = () => {
    alert('Coming Soon...');
  }

  private deleteItem = () => {
    Models.ItemAPI.destroy(this.props.item.id)
    .then(({ error, warning, message, content }: Models.ItemResponseData) => {
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
    if (event.currentTarget.id !== '') {
      alert('Clicked Item Option: ' + event.currentTarget.id + ' for item: ' + this.props.item.name);
    }      
    this.setState({ anchorEl: null });
  }

}

export default Flat;