/* This Project */
import * as Models                                    from 'src/Models';
import { ClickHandlerFunc }                           from "src/Resources/Generics";

/* Import all your NavigatorPanes here */
import { AppInstructions }                            from './AppInstructions';
import { ExamplePane }                                from './ExamplePane';

/* Put your NavigatorPanes here in the order you want them to appear. */
const generatePanes: (clickHandler: ClickHandlerFunc) => Models.NavigatorPane[] = (clickHandler: ClickHandlerFunc) => [
  (new Models.NavigatorPane(clickHandler, 'applicationInstructions', AppInstructions)),
  (new Models.NavigatorPane(clickHandler, 'examplePane', ExamplePane)),
]

export default generatePanes;