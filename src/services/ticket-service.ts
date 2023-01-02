import { Ticket } from "@src/models/Ticket";
import { TicketRepo } from "@src/repos/ticket-repo";


export class TicketService {
    static addBlogPost(ticket: Ticket): Promise<void> {
        return TicketRepo.addTicket(ticket);
    }
}