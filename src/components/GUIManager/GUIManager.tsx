import { ReactElement } from "react";

import Task from "../../tasks/Task";
import Idiom from "../Idiom/Idiom"
import { Requirements, Provide, matchRequirements } from "./registration";

export default abstract class GUIManager {
    public readonly task: Task;
    constructor(task: Task) {
        this.task = task;
    }
    protected abstract component: (components: { [key: string]: ((state: {}) => ReactElement<{}>) }) => ReactElement<{}>
    protected abstract readonly requirements: ({ name: string } & Requirements)[];
    private __components: { [key: string]: ((state: {}) => ReactElement<{}>) } = {};
    private __metRequirements: [Requirements, Idiom][];
    /**
     * Hacky, but it has to happen post-construction
     */
    private get components() {
        if (this.__components) return this.__components;
        const pairs = matchRequirements(this.requirements);
        const components: {[key: string]: ((state: {}) => ReactElement<{}>)} = {};
        for (const [{ name }, { component }] of pairs) {
            components[name] = component;
        }
        this.__components = components;
        return this.__components;
    };
    Renderable = () => {
        return this.component(this.components);
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
