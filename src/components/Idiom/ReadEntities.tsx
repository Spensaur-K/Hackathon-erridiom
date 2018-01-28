/**
 * Display a bunch of entities
 * Create a frame for a component that takes an entity
 */

import "./ReadEntities.scss";
import Idiom from "./Idiom";

import { registerIdiom } from "../GUIManager/registration";

/**
 * 
 * @param entities data to display
 * @param importantProps props to extract and display from each entity
 */
function ReadEntities({ data, actions }) {
    debugger;
    return (<div className="ReadEntities">Hello, World!</div>);
}

function multipleEntityReader(state: {}, entities: {}) {
    state;entities;
}

const idiom: Idiom = {
    component: ReadEntities,
    features: {
        actions: ["examineEntity"],
        provides: { multipleEntityReader }
    }
}

registerIdiom(idiom);