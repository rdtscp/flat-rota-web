/* This Project */
import { ClickHandlerFunc }                           from 'src/Resources/Generics';

interface INavigatorJSXGenerator {
  drawerElement:  (clickHandler: ClickHandlerFunc, selectorID: string, key: number) => JSX.Element;
  paneElement:    JSX.Element;
  paneTitle:      string;
}
type NavigatorJSXGenerator   = INavigatorJSXGenerator; 

class NavigatorPane {
  
  public  selectorID:     string;
  public drawerElement:  (clickHandler: ClickHandlerFunc, selectorID: string, key: number) => JSX.Element;;
  public paneElement:    JSX.Element;
  public paneTitle:      string;
  
  private clickHandler:  ClickHandlerFunc;

  constructor(clickHandler: ClickHandlerFunc, selectorID: string, navElements: NavigatorJSXGenerator) {
    this.drawerElement  = navElements.drawerElement;
    this.paneElement    = navElements.paneElement;
    this.paneTitle      = navElements.paneTitle;
    this.selectorID     = selectorID;

    this.clickHandler   = clickHandler;
  }

  public getDrawer(index: number) {
    return this.drawerElement(this.clickHandler, this.selectorID, index);
  }

}

export {
  NavigatorJSXGenerator,
  NavigatorPane,
}