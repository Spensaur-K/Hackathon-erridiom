import Task from "../Task";
import data from "./data.js";

export default class Contacts extends Task {
    getEntity(id: string) {
        for (const datum of data) {
            if (datum.id === id) {
                return datum;
            }
        }
    }
}
