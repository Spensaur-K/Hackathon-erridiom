import GUIManager from "./GUIManager";
import { Requirements } from "./registration";
import "./StandardCRUD.scss";


function StandardCRUD() {
    return (<div className="StandardCRUD">Hello, World!</div>);
}

export default class extends GUIManager {
    component = StandardCRUD
    requirements: [
        {
            name: "list",
            actions: ["examineEntity"],
            provides: ["multipleEntityReader"]
        },
        {
            name: "examine",
            actions: null,
            provides: ["singleEntityReader"]
        }
    ];
}