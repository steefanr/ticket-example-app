import { Tags } from "@src/models/Tag";
import { Ticket } from "@src/models/Ticket";
import jsonfile from "jsonfile";

export class DB {
    constructor(public tickets: Ticket[], public tags: Tags) { }
}

const dbFile = "database.json";

export class ORM {

    public openDB(): Promise<DB> {
        return jsonfile.readFile(__dirname + '/' + dbFile);
    }

    public writeDB(db: DB): Promise<void> {
        return jsonfile.writeFile((__dirname + '/' + dbFile), db);
    }
}