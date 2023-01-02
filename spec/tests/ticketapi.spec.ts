import supertest, { SuperTest, Test, Response } from "supertest";
import app from '../../src/server';
import logger from 'jet-logger';
import HttpStatusCodes from "../../src/configurations/HttpStatusCodes";
import { TicketRepo } from "@src/repos/ticket-repo";
import { Ticket } from "@src/models/Ticket";


describe("Ticket Routes", () => {
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    })

    describe(`POST: /ticket`, () => {
        it("returns an error when the user_id is missing", (done) => {

            agent.post("/api/v1/ticket").send({ title: "A title" }).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
                expect(res.body.error).toEqual("Invalid user_id");
                done();
            })
        })

        it("returns an error when the user_id is not a number", (done) => {

            agent.post("/api/v1/ticket").send({ user_id: "a user", title: "A title" }).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
                expect(res.body.error).toEqual("Invalid user_id");
                done();
            })
        })

        it("returns an error when the title is not a missing", (done) => {

            agent.post("/api/v1/ticket").send({ user_id: 1234 }).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
                expect(res.body.error).toEqual("Invalid title");
                done();
            })
        })

        it("returns an error when the tags are not an array", (done) => {

            agent.post("/api/v1/ticket").send({ user_id: 1234, title: "A title", tags: "a tag" }).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
                expect(res.body.error).toEqual("Invalid tags");
                done();
            })
        })

        it("returns an error when the tags are more than 5", (done) => {

            agent.post("/api/v1/ticket").send({ user_id: 1234, title: "A title", tags: ["1", "2", "3", "4", "5", "6"] }).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
                expect(res.body.error).toEqual("Invalid tags");
                done();
            })
        })

        it("returns correctly when a good body is passed", (done) => {
            //Mock call to the TicketRepo, not testing the repo in this test
            spyOn(TicketRepo, 'addTicket').and.callFake(async (ticket: Ticket) => { return; })
            agent.post("/api/v1/ticket").send({ user_id: 1234, title: "A title", tags: ["1", "2", "3", "4"] }).end((err: Error, res: Response) => {
                !!err && logger.err(err);
                expect(res.status).toBe(HttpStatusCodes.OK);
                expect(res.body.error).toBeUndefined();
                done();
            })
        })
    })
})