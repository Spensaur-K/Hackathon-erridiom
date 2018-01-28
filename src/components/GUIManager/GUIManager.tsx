import { ReactElement } from "react";

import Task from "../../tasks/Task";
import Idiom from "../Idiom/Idiom"
import { Requirements, Provide, matchRequirements, actions, registerGUIManager } from "./registration";

export type NamedRequirements = { name: string } & Requirements;


const idiomLoader = require.context("../Idiom", true, /\.tsx$/);
idiomLoader.keys().forEach(name => {
    idiomLoader(name);
});;

export default abstract class GUIManager {
    public readonly task: Task;
    constructor(task: Task) {
        this.task = task;
        registerGUIManager(this);
    }
    protected abstract setup(act: typeof actions): void
    protected abstract component: (components: { [key: string]: ((state: {}) => ReactElement<{}>) }) => ReactElement<{}>
    protected abstract readonly requirements: NamedRequirements[];
    private __components: { [key: string]: ((state: {}) => ReactElement<{}>) } = null as any;
    private __metRequirements: [NamedRequirements, Idiom][];
    /**
     * Hacky, but it has to happen post-construction
     */
    protected postConstruct() {
        const pairs = matchRequirements(this.requirements);
        this.__metRequirements = pairs;
        const components: {[key: string]: ((state: {}) => ReactElement<{}>)} = {};
        for (const [{ name }, { component }] of pairs) {
            components[name] = component as any;
        }
        this.__components = components;
        this.setup(actions);
    };
    Renderable = () => {
        return this.component(this.__components);
    }
    getProvider<T extends keyof Provide>(provides: T): (...args: any[]) => any {
        for (const [, idiom] of this.__metRequirements) {
            if (idiom.features.provides[provides]) {
                const state = (idiom.component as any).getState();
                const func: any = idiom.features.provides[provides];
                return function (...args: any[]): any {
                    const newState = func(state, ...args);
                    (idiom.component as any).setState(newState);
                };
            }
        }
        throw "died";
    }
}
