
import { ReactElement } from "react"
import { Action, Provide, actions } from "../GUIManager/registration";

interface Idiom {
    readonly component: (props: {data: any, act: typeof actions}) => ReactElement<{}>
    readonly features: {
        readonly actions: Array<Action>;
        readonly provides: Provide;
    }
}

export default Idiom;
