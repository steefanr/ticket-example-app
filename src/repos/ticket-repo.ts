import { Ticket } from "@src/models/Ticket";
import { DB, ORM } from "./mock-orm";
import axios from "axios";

const orm = new ORM();

export class TicketRepo {
    static max_count = 0;
    static max_tag = '';

    static async addTicket(ticket: Ticket): Promise<void> {
        const db: DB = await orm.openDB();
        db.tickets = [...db.tickets, ticket];


        if (TicketRepo.max_tag === '') {
            TicketRepo.max_tag = Object.keys(db.tags).reduce((a, b) => db.tags[a] > db.tags[b] ? a : b)
            console.log(this.max_tag)
            TicketRepo.max_count = db.tags[TicketRepo.max_tag]
        }

        ticket.tags?.forEach((tag) => {
            tag = tag.toLowerCase();

            if (db.tags[tag] === undefined) {
                db.tags[tag] = 0;
            }

            db.tags[tag]++;

            if (db.tags[tag] > TicketRepo.max_count) {
                TicketRepo.max_tag = tag
                TicketRepo.max_count = db.tags[tag]
            }
        })

        await orm.writeDB(db);

        if (TicketRepo.max_tag !== '')
            axios.get(`https://webhook.site/5a752b46-b48c-414f-b317-04b9e989baa5?q=${TicketRepo.max_tag}`);

    }
}