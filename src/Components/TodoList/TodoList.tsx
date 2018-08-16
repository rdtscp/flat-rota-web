/* Components/SettingsMenu/DeviceList/DeviceList.tsx */

/* React/Redux/Other */
import * as React                                     from 'react';

/* This Component */
import { TodoListProps, TodoListState }               from './Types';

class TodoList extends React.Component<TodoListProps, TodoListState> {

  public render() {
    return (
      <div>
        Your Todo List:
      </div>
    );
  }

}

export default TodoList;