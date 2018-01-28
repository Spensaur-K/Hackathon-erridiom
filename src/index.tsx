import { render } from "react-dom";
import { Manager } from "./tasks/contacts/Contacts";
import { registerGUIManager } from "./components/GUIManager/registration";


registerGUIManager(Manager)
render(<Manager.Renderable />, document.getElementById("app"));
