# Example Ticket App

This is a simple CRUD REST API written in NodeJS using Express and typescript.

## Endpoints

The existing endpoints are the following:

Create new note `POST /api/v1/ticket`
with the payload below:

```
{
    user_id: number,
    title: string,
    tags?: string[]
}
```
Everytime this endpoint is hit, a request with a query parameter is sent to the URL `https://webhook.site/5a752b46-b48c-414f-b317-04b9e989baa5`, the query parameter contains the tag with the highest count in the database.

## Running the applications

To run the application run the following commands:

```
npm install
npm run start
```

The application will run by default on port 3000 and is reachable on `http://localhost.com:3000`.


## Database

To simplify the application there is no actual database. Everything is held in a json file and a mock ORM is used to work with the data.

Due to the presence of this mock ORM no unit tests are provided for functions using the mock ORM.


## Running tests

Tests can be run with the following command:
``` 
npm run test
```
