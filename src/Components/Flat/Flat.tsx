/* Components/SettingsMenu/Device/Device.tsx */

/* React/Redux/Other */
import * as React from 'react';

/* Material-UI */
import { Button, Chip, Dialog, DialogActions, 
  DialogContent, DialogTitle,
  ExpansionPanel, ExpansionPanelDetails,  ExpansionPanelSummary, Fade,
  FormControl, IconButton, Input, InputLabel, Snackbar, Typography
}                                                     from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import Item                                           from 'src/Components/Item';
import * as Models                                    from "src/Models";

/* This Component */
import { FlatProps, FlatState }                       from './Types';

class Flat extends React.Component<FlatProps, FlatState> {

  constructor(props: FlatProps) {
    super(props);
    this.state = {
      dialogOpen:       false,
      newItemDesc:      '',
      newItemName:      '',
      snackbarMessage:  '',
      snackbarOpen:     false,
    };
  }

  public render() {
    const { classes } = this.props;

    const thisFlat: Models.Flat = this.props.flat;
    const hasNotificationItems = thisFlat.items.filter(item => item.notification === true);
    const nonNotificationItems = thisFlat.items.filter(item => item.notification === false);
    hasNotificationItems.sort((a, b) => b.lastBumped - a.lastBumped);
    nonNotificationItems.sort((a, b) => b.lastBumped - a.lastBumped);
    // const sortedFlats = thisFlat.items.sort((a, b) => {
    //   return (+(a > b.value) || +(a.value === b.value) - 1) || (+(a.secondaryValue > b.secondaryValue) || +(a.secondaryValue === b.secondaryValue) - 1);
    // });
    return (
      <div className={classes.flatContainer}>
        <div style={{ width: 327 }}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<Icons.ExpandMore />}>
              <Typography variant="headline"> Flat Members </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {thisFlat.members.map((member, index) =>
                  <React.Fragment key={index}>
                    <Chip label={member.username} className={classes.chip} color="primary" />
                  </React.Fragment>
                )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {hasNotificationItems.map((item: Models.Item, index: number) => (
            <React.Fragment key={index}>
              <Item item={item} flat={this.props.flat} showSnackbar={this.showSnackbar} />
            </React.Fragment>
          ))}
          {nonNotificationItems.reverse().map((item: Models.Item, index: number) => (
            <React.Fragment key={index}>
              <Item item={item} flat={this.props.flat} showSnackbar={this.showSnackbar} />
            </React.Fragment>
          ))}
          <Button variant="fab" className={classes.fab} color="primary" onClick={this.toggleNewItemDialog} >
            <Icons.Add />
          </Button>
          <Dialog
            open={this.state.dialogOpen}
            // onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Create New Item"}</DialogTitle>
            <DialogContent>
              <div style={{width: 223}}>
                  <FormControl>
                  <InputLabel htmlFor="newItemName">Item Name</InputLabel>
                  <Input
                    id="newItemName"
                    type="text"
                    required={true}
                    value={this.state.newItemName}
                    onChange={this.handleChange}
                    style={{width: 223}}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="newItemDesc">Item Description</InputLabel>
                  <Input
                    id="newItemDesc"
                    type="text"
                    value={this.state.newItemDesc}
                    onChange={this.handleChange}
                    multiline={true}
                    style={{width: 223}}
                    />
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleNewItemDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={this.createItem} color="primary" autoFocus={true}>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Snackbar
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.hideSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          TransitionComponent={Fade}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.closeSnackbar}
              onClick={this.hideSnackbar}
            >
              <Icons.Close />
            </IconButton>,
          ]}
        />
      </div>
    );
  }

  private toggleNewItemDialog = () => {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    });
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
  };


  private createItem = () => {
    if (this.state.newItemName === '') {
      this.showSnackbar('Item Name cannot be empty');
    }
    Models.ItemAPI.create(this.props.flat.id, this.state.newItemName, this.state.newItemDesc)
    .then((data: Models.ItemResponseData) => {
      this.showSnackbar(data.message);
      if ('error' in data && 'warning' in data && !data.error && !data.warning) {
        this.setState({
          dialogOpen:   false,
          newItemDesc:  '',
          newItemName:  '',
        });
      }
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
    .catch(error => {
      // tslint:disable-next-line:no-console
      console.log(error);
    });
  }

  private showSnackbar = (message: string) => {
    this.setState({
      snackbarMessage: message,
      snackbarOpen: true,
    });
  };

  private hideSnackbar = () => {
    this.setState({
      snackbarOpen: false
    });
  };

}

export default Flat;