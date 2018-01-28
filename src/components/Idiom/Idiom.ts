
import { ReactElement } from "react"
import { Action, Provide } from "../GUIManager/registration";

interface Idiom {
    readonly component: (state: {}) => ReactElement<{}>
    readonly features: {
        readonly actions: Array<Action>;
        readonly provides: Provide;
    }
}

export default Idiom;
