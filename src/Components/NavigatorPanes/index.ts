/* This Project */
import * as Models                                    from 'src/Models';
import { ClickHandlerFunc }                           from "src/Resources/Generics";

/* Import all your NavigatorPanes here */
import { newGroupPane }                               from './NewGroup';
import { todoPane }                                   from './Todo';

/* Put your NavigatorPanes here in the order you want them to appear. */
const generatePanes: (clickHandler: ClickHandlerFunc) => Models.NavigatorPane[] = (clickHandler: ClickHandlerFunc) => [
  (new Models.NavigatorPane(clickHandler, 'newGroupPane', newGroupPane)),
  (new Models.NavigatorPane(clickHandler, 'todoPane', todoPane)),
]

export default generatePanes;