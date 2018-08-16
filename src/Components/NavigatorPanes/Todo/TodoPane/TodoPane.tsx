/* React/Redux/Other */
import * as React                                     from 'react';

/* This Component */
import { TodoPaneProps, TodoPaneState }       from './Types';

export default class TodoPane extends React.Component<TodoPaneProps, TodoPaneState> {
  
  public render() {
    return (
      <div>
        All the things you are due to buy.
      </div>
    );
  }

}