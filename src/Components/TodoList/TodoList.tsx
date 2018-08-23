/* Components/SettingsMenu/DeviceList/DeviceList.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import {
  CircularProgress, Fade, IconButton, Snackbar,
  Typography
}                                                     from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import Item                                           from 'src/Components/Item';
import * as Models                                    from 'src/Models';

/* This Component */
import { TodoListProps, TodoListState }               from './Types';

class TodoList extends React.Component<TodoListProps, TodoListState> {

  constructor(props: TodoListProps) {
    super(props);
    this.state = {
      snackbarMessage:  '',
      snackbarOpen:     false,
    }
  }

  public render() {
    const { classes, currentUser, flats } = this.props; 
    if (flats[0] !== undefined && !('items' in flats[0])) {
      const populatedFlats: Array<Promise<Models.Flat | null>> = flats.map((flat: Models.Flat) => 
        Models.FlatAPI.get(flat.id)
        .then((data: Models.FlatResponseData) => data.content)
        .catch(error => null)
      );
      Promise.all(populatedFlats)
      .then(allPopulatedFlats => {
        this.props.setCurrentUserFlats(allPopulatedFlats as Models.Flat[]);
      })
      return (
        <div className={classes.loadingContainer}>
          <div style={{width: 56.56}}>
            <CircularProgress color="primary"/>
          </div>
        </div>
      );
    }
    else {
      let items: Models.Item[] = [];
      flats.forEach(flat => {
        const currFlatItems = flat.items.filter(currFlat => currFlat.notification === true);
        const yourItems     = currFlatItems.filter(item => {
          const itemRota = JSON.parse(item.rota);
          return currentUser.id === itemRota[0];
        });
        items = items.concat(yourItems);
      });
      if (items.length === 0) {
        return (
          <Typography variant="headline" gutterBottom={true}>
            You have nothing to do!
          </Typography>
        );
      }
      return (
        <div className={classes.todoContainer}>
          <div style={{ width: 327 }}>
            {currentUser.flats.map((flat, flatIndex) => {
              const relevantItems = this.getFlatItems(flat);
              if (relevantItems.length > 0) {
                return (
                  <React.Fragment key={flatIndex}>
                    <Typography variant="headline" gutterBottom={true}>
                      {flat.name}
                    </Typography>
                    <hr />
                    {relevantItems.map((item, itemIndex) => 
                      <React.Fragment key={itemIndex}>
                        <Item item={item} flat={item.flat} showSnackbar={this.showSnackbar} />
                      </React.Fragment>
                    )}
                    <br />
                  </React.Fragment>
                );
              }
              else {
                return (<React.Fragment key={flatIndex}>{/*  */}</React.Fragment>);
              }
            })}
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
  }

  private getFlatItems: (flat: Models.Flat) => Models.Item[] = (flat: Models.Flat) => {
    const currFlatItems   = flat.items.filter(currFlat => currFlat.notification === true);
    const yourItems       = currFlatItems.filter(item => this.props.currentUser.id === JSON.parse(item.rota)[0]);
    return yourItems;
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

export default TodoList;