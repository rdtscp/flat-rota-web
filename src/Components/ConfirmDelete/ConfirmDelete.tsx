/* Components/SettingsMenu/ConfirmDelete.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* Material-UI */
import * as UI                                        from '@material-ui/core';

/* This Project */
import * as Models                                    from 'src/Models';

/* This Component */
import { ConfirmDeleteProps, ConfirmDeleteState }     from './Types';

class ConfirmDelete extends React.Component<ConfirmDeleteProps, ConfirmDeleteState> {

  constructor(props: ConfirmDeleteProps) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  public render() {

    const { classes }     = this.props;
    const steps           = ['Begin Deleting Account', 'What You Will Lose', 'Final Chance'];
    const { activeStep }  = this.state;

    return (
      <div className={classes.root}>
        <UI.Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <UI.Step key={label}>
                <UI.StepLabel>{label}</UI.StepLabel>
                <UI.StepContent>
                  <UI.Typography>{this.getStepContent(index)}</UI.Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <UI.Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </UI.Button>
                      <UI.Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Next' : 'Next'}
                      </UI.Button>
                    </div>
                  </div>
                </UI.StepContent>
              </UI.Step>
            );
          })}
        </UI.Stepper>
        {activeStep === steps.length && (
          <UI.Paper square={true} elevation={0} className={classes.resetContainer}>
            <UI.Button onClick={this.deleteAccount} className={classes.button} color="secondary">
              Delete Account
            </UI.Button>
          </UI.Paper>
        )}
      </div>
    );
  }

  private deleteAccount = () => {
    Models.UserAPI.destroy()
    .then((data: Models.UserResponseData) => {
      this.props.setAuthStateAction('');
    })
    .catch((data: Models.UserResponseData) => {
      alert(data.message);
      this.props.setAuthStateAction('');
    })
  }

  private handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  private handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  private getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return `Click 'Next' to begin deleting your account.`;
      case 1:
        return 'Are you sure you want to delete your account. Deleting your account is permanent, it cannot be undone. All your data will be deleted and unrecoverable.';
      case 2:
        return `Last Chance`;
      default:
        return 'Unknown step';
    }
  }

}

export default ConfirmDelete;