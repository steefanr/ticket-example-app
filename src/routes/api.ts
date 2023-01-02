import { Router } from "express";
import { TicketRouter } from "./ticket-routes";


export const apiRouter = Router();

apiRouter.use(TicketRouter);
