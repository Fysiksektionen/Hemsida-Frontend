# Mock backend
Denna mapp innehåller middleware som sedan används av [json-server](https://github.com/typicode/json-server) för att skapa ett mock-backend.

## Körning
Mock-backendet körs via `npm start`. Vill man enbart köra backend-servern kan man använda kommandot `npx nodemon --inspect server.js` eller `node server.js`. Vill man enbart köra frontendet (t.ex. vid körning av ett annat backend), används `npm run start-frontend`.

Servern körs på port 3002, och alla requests bör skickas till [http://localhost:3002/api/*](http://localhost:3002/api/), om inte detta ändras i [server.js](server.js).

## Implementerade endpoints
 - GET /site/
 - GET /pages/
 - GET /pages/{id}
 - GET /news/
 - GET /resolve-url?path={path}