import HttpStatusCodes from "@src/configurations/HttpStatusCodes";
import { Ticket } from "@src/models/Ticket";
import { TicketService } from "@src/services/ticket-service";
import { Router, Request, Response } from "express";

export const TicketRouter = Router();

TicketRouter.post('/ticket', addTicket);



async function addTicket(req: Request<Ticket>, res: Response) {
    const user_id: number = req.body.user_id;
    const title: string = req.body.title;
    const tags: string[] = req.body.tags;
    let error: string | undefined = undefined;

    if (!user_id || isNaN(user_id)) {
        error = "Invalid user_id";
    }

    if (!title) {
        error = "Invalid title";
    }

    if ((tags && !Array.isArray(tags)) || (tags && tags.length > 5)) {
        error = "Invalid tags";
    }

    if (error) {
        return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).json({ error: error });
    }

    await TicketService.addTicket({ user_id, title, tags });

    return res.status(HttpStatusCodes.OK).json({ message: "Ticket Added Successfully!" })

}
