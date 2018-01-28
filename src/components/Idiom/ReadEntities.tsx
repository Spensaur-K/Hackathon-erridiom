/**
 * Display a bunch of entities
 * Create a frame for a component that takes an entity
 */

import "./ReadEntities.scss";
import Idiom from "./Idiom";

import { registerIdiom, actions } from "../GUIManager/registration";

/**
 * 
 * @param entities data to display
 * @param importantProps props to extract and display from each entity
 */
function ReadEntities({ data, act }: { data: any, act }) {
    return (<div className="ReadEntities">Hello, World!</div>);
}

function multipleEntityReader(state: {}, entities: {}) {
    return { ...state, entities };
}

const idiom: Idiom = {
    component: ReadEntities,
    features: {
        actions: ["examineEntity"],
        provides: { multipleEntityReader }
    }
}

registerIdiom(idiom);