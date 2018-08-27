/* Components/LoginForm/LoginForm.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import * as UI                                        from '@material-ui/core';
import * as Icons                                     from '@material-ui/icons';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { AddMembersFormProps, AddMembersFormState }   from './Types';

class AddMembersForm extends React.Component<AddMembersFormProps, AddMembersFormState> {

  constructor(props: AddMembersFormProps) {
    super(props);
    this.state = {
      formOpen:           true,
      newFlatMembers:     [],
      newFlatNewMember:   '',
    };
  }
  
  public render() {
    const { classes } = this.props;

    return (
      <UI.Dialog
        open={this.state.formOpen}
        onClose={this.props.cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <UI.DialogTitle id="alert-dialog-title">{"Add Members to this Flat"}</UI.DialogTitle>
        <div>
          <form className={classes.container} noValidate={true} autoComplete="off">
            <UI.FormControl className={classes.margin}>
              <UI.InputLabel htmlFor="newFlatNewMember">Add Member</UI.InputLabel>
              <UI.Input
                id="newFlatNewMember"
                type="text"
                value={this.state.newFlatNewMember}
                onChange={this.handleChange}
                onKeyDown={this.handleAddMemberEnter}
                endAdornment={
                  <UI.InputAdornment position="end">
                    <UI.IconButton
                      aria-label="Add member to group"
                      onClick={this.addMember}
                      >
                      <Icons.AddCircle />
                    </UI.IconButton>
                  </UI.InputAdornment>
                }
                />
            </UI.FormControl>
            <UI.Paper className={classes.paperRoot} elevation={1}>
              <UI.Typography variant="subheading">
                Members
              </UI.Typography>
              <div style={{ display: 'block' }}>
                {this.state.newFlatMembers.map((username: string, index: number) => { 
                  if (username === this.props.currentUser.username) {
                    return (
                      <UI.Chip
                      key={index}
                      label={username}
                      id={username}
                      className={classes.chip}
                      color="primary"
                      />
                    );
                  } else {
                    return (
                      <UI.Chip
                      key={index}
                      label={username}
                      id={username}
                      onDelete={this.removeMember}
                      className={classes.chip}
                      color="primary"
                      />
                    );
                  }
                  
                })}
              </div>
            </UI.Paper>
          </form>
        </div>
        <UI.DialogActions>
          <UI.Button onClick={this.props.cancel} color="primary">
            Cancel
          </UI.Button>
          <UI.Button onClick={this.addMembers} color="primary" autoFocus={true}>
            Add Members
          </UI.Button>
        </UI.DialogActions>
      </UI.Dialog>
    );
  }

  private addMembers = () => {
    Models.FlatAPI.update(this.props.flatID, this.state.newFlatMembers)
    .then((data: Models.FlatResponseData) => {
      this.props.submit();
    })
    .catch(error => {
      alert(error);
    });
  }

  private handleChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
    });
  }

  private handleAddMemberEnter = (event:any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.addMember();
    }
  }

  private addMember = () => {
    const newMembers = this.state.newFlatMembers;
    if (this.state.newFlatNewMember === '') {
      return;
    }
    newMembers.push(this.state.newFlatNewMember)
    this.setState({
      newFlatMembers:     newMembers,
      newFlatNewMember:   '',
    });
  }

  private removeMember = (event: React.MouseEvent<HTMLElement>) => {
    const chipElement = event.currentTarget.parentElement;
    if (chipElement !== null && 'id' in chipElement) {
      const memberIndex: number = this.state.newFlatMembers.indexOf(chipElement.id);
      const newFlatMembers = [...this.state.newFlatMembers];
      newFlatMembers.splice(memberIndex, 1);
      this.setState({
        newFlatMembers,
      });
    }
  }

}

export default AddMembersForm;