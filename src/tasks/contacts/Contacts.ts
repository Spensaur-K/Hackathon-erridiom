import Task from "../Task";
import data from "./data.js";
import StandardCrud from "../../components/GUIManager/StandardCRUD";

class Contacts extends Task {
    getEntity(id: string) {
        for (const datum of data) {
            if (datum.id === id) {
                return datum;
            }
        }
        throw "died";
    }
    getEntities() {
        return data;
    }
}

export const Manager = new StandardCrud(new Contacts);
