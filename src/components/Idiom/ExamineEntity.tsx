/**
 * Display a bunch of entities
 * Create a frame for a component that takes an entity
 */

import "./ExamineEntity.scss";
import Idiom from "./Idiom";

import { registerIdiom, actions } from "../GUIManager/registration";

/**
 * 
 * @param entities data to display
 * @param importantProps props to extract and display from each entity
 */
function ExamineEntity({ data, act }: {data: any, act: typeof actions}) {
    return (<div className="ExamineEntity">Hello, World!</div>);
}

function singleEntityReader(state: {}, entity: {}) {
    state;entity;
}

const idiom: Idiom = {
    component: ExamineEntity,
    features: {
        actions: [],
        provides: { singleEntityReader }
    }
}

registerIdiom(idiom);