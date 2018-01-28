import { ReactElement } from "react";

import Task from "../../tasks/Task";
import { Requirements, Provide, matchRequirements } from "./registration";

export default abstract class GUIManager {
    public readonly task: Task;
    constructor(task: Task) {
        this.task = task;
    }
    protected abstract component: (components: { [key: string]: ReactElement<{}> }) => ReactElement<{}>
    protected abstract readonly requirements: ({ name: string } & Requirements)[];
    private components = (() => {
        const pairs = matchRequirements(this.requirements);
        const components = {};
        for (const [{ name }, { component }] of pairs) {
            components[name] = component;
        }
        return components;
    })();
    Renderable() {
        return this.component(this.components);
    }
    getProvider<T extends keyof Provide>(provides: T): [{}, Provide[T]] {
        return null as any;
    }
}
