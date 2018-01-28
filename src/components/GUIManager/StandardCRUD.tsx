import GUIManager, { NamedRequirements } from "./GUIManager";
import "./StandardCRUD.scss";

function StandardCRUD(components) {
    const { List, Examine } = components;
    return (<div className="StandardCRUD">
        <List />
        <Examine />
    </div>);
}

export default class extends GUIManager {
    constructor(t) {
        super(t);
        this.postConstruct();
    }
    component = StandardCRUD
    requirements = [
        {
            name: "List",
            actions: ["examineEntity"],
            provides: ["multipleEntityReader"]
        },
        {
            name: "Examine",
            actions: null,
            provides: ["singleEntityReader"]
        }
    ] as NamedRequirements[]
    setup(actions) {
        debugger;
        actions.displayEntities(this.task.getEntities());
    }
}