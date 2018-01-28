/**
 * Components register what actions they dispatch and what functionality they provide
 */

import { Component } from "react";

import GUIManager from "./GUIManager";
import Idiom from "../Idiom/Idiom";

let manager: GUIManager = null as any;
const knownIdioms = new Set<Idiom>();

export function registerGUIManager(assign: GUIManager) {
    if (manager != null) {
        throw new Error("Manager already set");
    }
    manager = assign;
}

export function registerIdiom(idiom: Idiom) {
    knownIdioms.add(createContainer(idiom));
}

function idiomsWithRequirements(idiomPool: Iterable<Idiom>, req: Requirements): Idiom[] {
    return [...idiomPool].filter((idiom: Idiom) => {
        if (req.actions && req.actions.some(action => idiom.features.actions.indexOf(action) == -1)) {
            return false;
        }
        if (req.provides && req.provides.some(provide => !(provide in idiom.features.provides))) {
            return false;
        }
        return true;
    });
}

/**
 * Algorithm should be improved for more complicated GUIManagers
 */
export function matchRequirements<T extends Requirements>(reqs: T[]): [T, Idiom][] {
    const pool = new Set(knownIdioms);
    return reqs.map(req => {
        const selected = idiomsWithRequirements(pool, req)[0];
        if (!selected) {
            throw new Error("Requirements could not be met, improve algorithm");
        }
        pool.delete(selected);
        return [req, selected] as [T, Idiom];
    });
}

function createContainer(idiom: Idiom) {
    const idiomActions = {};
    idiom.features.actions.forEach(action => idiomActions[action] = actions[action]);
    class Container extends Component {
        constructor(props: {}) {
            super(props);
            this.state = {};
        }
        render() {
            return <idiom.component {...({data: this.state, act: idiomActions} as any)} />;
        }
    }
    return {
        __proto__: idiom,
        component: Container
    } as any as Idiom;
}

export const actions = {
    examineEntity(id: string) {
        const singleEntityReader = manager.getProvider("singleEntityReader");
        singleEntityReader(manager.task.getEntity(id));
    },
    displayEntities(entities: {}[]) {
        const multipleEntityReader = manager.getProvider("multipleEntityReader");
        multipleEntityReader(entities);
    }
}

interface provides {
    multipleEntityReader(state: {}, entities: {}): void;
    singleEntityReader(state: {}, entity: {}): void;
}

export type Action = keyof (typeof actions);
export type Provide = Partial<provides>;
export interface Requirements {
    readonly actions: Array<Action> | null;
    readonly provides: Array<(keyof Provide)> | null;
};