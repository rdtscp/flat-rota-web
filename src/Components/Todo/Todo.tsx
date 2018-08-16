/* React/Redux/Other */
import * as React                                     from 'react';

/* This Component */
import { TodoProps, TodoState }                       from './Types';

export default class Todo extends React.Component<TodoProps, TodoState> {
  
  public render() {
    return (
      <div>
        All the things you are due to buy.
      </div>
    );
  }

}