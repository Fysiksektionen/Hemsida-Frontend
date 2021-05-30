# Hemsida client

<p align="center">
    <img src="./src/mediafiles/placeholder_images/Fysiksektionen_logo.svg" width="300" height="300" alt=""/>
</p>

Hej och välkommen till repot för frontenden av Fysiksektionens hemsida! Med ett gränssnitt mot vårt API definierat i [Hemsida-Docs](https://github.com/Fysiksektionen/Hemsida-Docs) och [Hemsida-Backend](https://github.com/Fysiksektionen/Hemsida-Backend) är målet att bygga en snygg och välfungerade hemsida för allt möjligt som sektionen vill ha.

### Innehåll
- [Hemsida client](#hemsida-client)
    - [Innehåll](#innehåll)
  - [Installera och kör](#installera-och-kör)
    - [Med Docker (rekommenderat)](#med-docker-rekommenderat)
    - [Lokalt](#lokalt)
  - [Resurser](#resurser)
    - [Hur funkar hemsidan?](#hur-funkar-hemsidan)
    - [Dokumentation](#dokumentation)
    - [React](#react)
    - [Bootstrap](#bootstrap)
    - [Docker](#docker)
    - [Övrigt](#övrigt)
  - [Licens](#licens)
  - [Kontakt](#kontakt)
- [Old stuff](#old-stuff)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run build`](#npm-run-build)
    - [`npm run docs-serve`](#npm-run-docs-serve)
    - [`npm run lint-check`](#npm-run-lint-check)
    - [`npm run lint-fix`](#npm-run-lint-fix)

--------------------------------------------
## Installera och kör
Det finns många olika sätt att jobba med frontend-projektet. Vad som passar just dig går inte att säga, utan det beror på din enviroment, vad du är van vid och helt enkelt egen preferens. Nedan listar vi två sätt som du kan jobba med projektet, men se till att hitta det sätt som paassar dig bäst!

### Med Docker (rekommenderat)
Docker är ett system för att skapa små väldefinierade kontainrar på din dator. I dessa går det att köra prrogram utan att de påverkas av dina egna instaällningar eller annat som kan störa. Det är ett bra sätt att lösa problemet "men det funkar ju på min dator...". Känner du inte till docker sen tidigar rekommenderar vi att du läser på lite först. Se info under [Docker](#docker).

Nedan följer instruktioenr för att använda Docker tillsammans med VSCode.

1. Installera Docker Engine och Docker Compose på din dator.
     - Windows: [Install Docker Desktop on Windows](https://docs.docker.com/docker-for-windows/install/)
     - Mac: [Install Docker Desktop on Mac](https://docs.docker.com/docker-for-mac/install/)
     - Linux: [Install Docker Engine](https://docs.docker.com/engine/install/) och [Install Docker Compose](https://docs.docker.com/compose/install/)
2. Klona repot till en mapp på din dator.
3. Öppna mappen i VSCode.
4. Installera Docker-stöd samt stöd för kontainrar. Det görs under Extentions och paketen som ska installeras heter `ms-vscode-remote.remote-containers` och `ms-azuretools.vscode-docker`.
5. Klicka på den gröna knappen längst ned till vänster och välj "Reopen folder in container". (OBS detta kan ta lång tid första gången det ska göras. Därefter kommer det gå snabbare tack vare cachening).
6. Nu finns en server som kör projektet på localhost:3000 :D

### Lokalt


--------------------------------------------
## Resurser
Här har vi samlat länkar som relaterar till projektet. Dessa kan användas för att komma igång med att skriva kod till projektet eller bara för att enkelt kunna navigera till vanliga resurser.

### Hur funkar hemsidan?
- [Nya hemsidan - Hur funkar det?](https://docs.google.com/document/d/1T447S6-wQkiHaMsznp7zZLlhvQuiFR7D7veq_GSpV7w/edit?usp=sharing) - Ger övergripande introduktion till projektet samt en något mer ingående förklaring till de stora koncepten inom projektet.
- [Hur funkar en hemsida?](https://docs.google.com/presentation/d/108EhkgI9oQ9c-gYYEzZpaNbk7iC9T2lgNGNW6eerLNw/edit?usp=sharing) - Ger en introduktion till att bygga en hemsida. Vad behöver göras?

### Dokumentation
- [Hemsidan-Docs](https://github.com/Fysiksektionen/Hemsida-Docs) - Documentation av det gemensamma API som delas mellan front- och backenden.
- [Hemsidan-Frontend/docs](https://github.com/Fysiksektionen/Hemsida-Frontend/tree/main/docs) - Innehåller noggran och specifik dokumentationtion av koncept och implementaioner begränsade till frontenden.

### React
React är det framework som ligger till grund för hela frontenden. För att jobba med projektet måste du ha kunskap om viktiga koncept inom React.

- [Getting Started](https://reactjs.org/docs/getting-started.html)
- [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)

### Bootstrap
Bootstrap är ett CSS- och Javascript-bibiliotek som används för att designa och styla vårt projekt. Bootstrap innehåller både metoder för positionering och styling av komponenter och kan även användas sirrekt i React tack vare andra bibiliotek. Vi försöker använda Bootstrap som styling så mycke tsom möjligt.

- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap - Flex](https://getbootstrap.com/docs/5.0/utilities/flex/)
- [Bootstrap - Grid system](https://getbootstrap.com/docs/5.0/layout/grid/)
- [Bootstrap - Columns](https://getbootstrap.com/docs/5.0/layout/columns/)
- [React bootstrap](https://react-bootstrap.github.io/components/alerts/)



### Docker

### Övrigt


--------------------------------------------
## Licens
Detta projekt lyder under standardformatet av MIT License. Du finner licensen här: [LICENSE](LICENSE).

--------------------------------------------
## Kontakt
Vill du veta mer om projektet, har frågor eller av annan anledning nå den ansvariga? Kontakta [webmaster(at)f.kth.se](mailto:webmaster@f.kth.se).

--------------------------------------------
# Old stuff
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

### `npm run docs-serve`

Serves the API-files needed by the API-viewer located at `/api-docs`. 


### `npm run lint-check`

Check that the code is according to lint rules. Print errors and warnings.

### `npm run lint-fix`

Check that the code is according to lint rules. Fix errors that can be automatically fixed and print remaining errors and warnings.
