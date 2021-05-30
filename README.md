# Frontend
## Körning
### Docker
För närvarande krävs docker-compose för att köra denna branch med docker, då den använder en router för att skicka api-requests till en separat container. Se mappen [docker](docker). Detta bör förhoppningsvis ändras inom kort. Notera att den använder port 30**1**0 istället för port 3000. Du bör alltså gå till [http://localhost:3010](http://localhost:3010), efter att docker-stacken har startats.
### Npm
Kör `npm start` samt `npm run start-mock-api`.

## Nuvarande status
Följande sidor servas via json-servern:
* [`/`](http://localhost:3010) (och alias för denna)
* [`/styret`](http://localhost:3010/styret)
* [`/nyheter`](http://localhost:3010/nyheter)
* [`/newsarticle`](http://localhost:3010/newsarticle)
* [`/fcom`](http://localhost:3010/fcom)

[`/fortroendevalda`](http://localhost:3010/fortroendevalda) servas för närvarande inte alls, då den ej lagrats i JSON i koden.

# Gammalt
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint-check`

Check that the code is according to lint rules. Print errors and warnings.

### `npm run lint-fix`

Check that the code is according to lint rules. Fix errors that can be automatically fixed and print remaining errors and warnings.
