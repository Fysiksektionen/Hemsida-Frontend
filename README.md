# Fysiksektionens hemsida - Frontend

<p align="center">
    <img src="./src/mediafiles/placeholder_images/Fysiksektionen_logo.svg" width="300" height="300" alt=""/>
</p>

Hej och välkommen till repot för frontenden av Fysiksektionens hemsida! Med ett gränssnitt mot vårt API definierat i [Hemsida-Docs](https://github.com/Fysiksektionen/Hemsida-Docs) och [Hemsida-Backend](https://github.com/Fysiksektionen/Hemsida-Backend) är målet att bygga en snygg och välfungerade hemsida för allt möjligt som sektionen vill ha.

## Innehåll
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
- [Licens](#licens)
- [Kontakt](#kontakt)

--------------------------------------------
## Installera och kör
Det finns många olika sätt att jobba med frontend-projektet. Vad som passar just dig går inte att säga, utan det beror på din environment, vad du är van vid och helt enkelt egen preferens. Nedan listar vi två sätt som du kan jobba med projektet, men se till att hitta det sätt som paassar dig bäst!

### Med Docker (rekommenderat)
Docker är ett system för att skapa små väldefinierade kontainrar på din dator. I dessa går det att köra program utan att de påverkas av dina egna inställningar eller annat som kan störa. Det är ett bra sätt att lösa problemet "men det funkar ju på min dator...". Känner du inte till docker sen tidigare rekommenderar vi att du läser på lite först. Se info under [Docker](#docker).

Nedan följer instruktioenr för att använda Docker tillsammans med VSCode.

1. Installera Docker Engine och Docker Compose på din dator.
     - Windows: [Install Docker Desktop on Windows](https://docs.docker.com/docker-for-windows/install/) (inkluderar alla paket)
     - Mac: [Install Docker Desktop on Mac](https://docs.docker.com/docker-for-mac/install/) (inkluderar alla paket)
     - Linux: [Install Docker Engine](https://docs.docker.com/engine/install/) och [Install Docker Compose](https://docs.docker.com/compose/install/) (båda behöver installeras)
2. Klona repot till en mapp på din dator.
3. Öppna mappen i VSCode.
4. Installera Docker-stöd samt stöd för kontainrar. Det görs under Extentions och paketen som ska installeras heter [`ms-vscode-remote.remote-containers`](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) och [`ms-azuretools.vscode-docker`](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker).
5. Klicka på den gröna knappen längst ned till vänster och välj "Reopen folder in container". (OBS detta kan ta lång tid första gången det ska göras. Därefter kommer det gå snabbare tack vare cachening).
6. Nu finns en server som kör projektet på localhost:3000 :D

För att lära dig hur du ska jobba med Docker tillsammans med VSCode, se resureserna under [Docker](#docker).

### Lokalt
För att installera lokalt behöver du göra följande:

1. Installera NodeJS v.16. ([Install NodeJS](https://nodejs.org/en/))
2. Clona repot och kör `npm install` från repots root för att hämta alla paket.
3. Kör `npm start` för att start starta en server som du kommer åt från browsern.


Detta finns det stöd för i både [VSCode](https://code.visualstudio.com/) och [WebStorm](https://www.jetbrains.com/webstorm/) (Pro-edition från KTH). Vad du väljer att jobba med är upp till dig. Utforksa gärna vad din IDE kan hjälpa dig med när det kommer till automatisk Lint-fix, paketinstallation, etc.

--------------------------------------------
## Resurser
Här har vi samlat viktiga koncept och länkar som relaterar till projektet. Dessa kan användas för att komma igång med att skriva kod till projektet eller bara för att enkelt kunna navigera till vanliga resurser.

Varje avsnitt har en kort introduktion, en lista på saker som du måste känna till för att skriva kod till hemsidan samt relaterade länkar.

### Hur funkar hemsidan?
- [Nya hemsidan - Hur funkar det?](https://docs.google.com/document/d/1T447S6-wQkiHaMsznp7zZLlhvQuiFR7D7veq_GSpV7w/edit?usp=sharing) - Ger övergripande introduktion till projektet samt en något mer ingående förklaring till de stora koncepten inom projektet.
- [Hur funkar en hemsida?](https://docs.google.com/presentation/d/108EhkgI9oQ9c-gYYEzZpaNbk7iC9T2lgNGNW6eerLNw/edit?usp=sharing) - Ger en introduktion till att bygga en hemsida. Vad behöver göras?

### Dokumentation
- [Hemsidan-Docs](https://github.com/Fysiksektionen/Hemsida-Docs) - Documentation av det gemensamma API som delas mellan front- och backenden.
- [Hemsidan-Frontend/docs](https://github.com/Fysiksektionen/Hemsida-Frontend/tree/main/docs) - Innehåller noggrann och specifik dokumentationtion av koncept och implementaioner begränsade till frontenden.

### React
React är det framework som ligger till grund för hela frontenden.

#### Viktiga koncept
- Vad är *JSX* (eller TSX när det är typescript)?
- Hur används Functional components? Hur används components i JSX/TSX?
- Vad är ett *state* och ett *context*? Skillnader?
- Hör görs API-anrop från React? Vad är en *promise*?
- Avancerat: Vad är en *reducer*?

#### Länkar
- [Getting Started](https://reactjs.org/docs/getting-started.html)
- [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)

### Bootstrap
Bootstrap är ett CSS- och Javascript-bibiliotek som används för att designa och styla vårt projekt. Bootstrap innehåller både metoder för positionering och styling av komponenter och kan även användas direkt i React tack vare andra bibiliotek. Vi försöker använda Bootstrap som styling så mycket som möjligt.

#### Viktiga koncept
- Layout med Bootstrap-klasser. Hur funkar *Grid*, *breakpoints* och *Flex*?
- Vilka grundläggande komponenter finns i Bootstrap? Hur används CSS-klasser för Bootsraps komponenter?
- Vad är React-Boostrap?
- Sass/Scss och att skriva över Bootstrap defaults.

#### Länkar
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap - Sass](https://getbootstrap.com/docs/5.0/customize/sass/)
- [Bootstrap - Flex](https://getbootstrap.com/docs/5.0/utilities/flex/)
- [Bootstrap - Grid system](https://getbootstrap.com/docs/5.0/layout/grid/)
- [React bootstrap](https://react-bootstrap.github.io/components/alerts/)


### Docker
Docker är industristandarden för att jobba med kontainer-utveckling. Det är ett sätt att tydligt kunna definiera och distribuera en hel projektstruktur, vilket gör utveckling och lansering supersmidigt.

#### Viktiga koncept
- Vad är en *Container*, *Image*, *Host-machine*?
- Grundläggande kunskap om Docker CLI. Vad innebär *build*, *run*, *stop* kommandona?
- Vad är en *Dockerfile* och en *docker-compose.yml* fil?
- Vad är *port-forwarding* och varför behövs det?
- Vad är *Volumes* och *Bind-mounts*. Hur används det och varför?

#### Länkar
- [Docker - Getting started](https://docs.docker.com/get-started/)
- [VSCode - Developing inside a Container](https://code.visualstudio.com/docs/remote/containers)
- [VSCode - Remote development in Containers](https://code.visualstudio.com/docs/remote/containers-tutorial)

--------------------------------------------
## Licens
Detta projekt lyder under standardformatet av MIT License. Du finner licensen här: [LICENSE](LICENSE).

--------------------------------------------
## Kontakt
Vill du veta mer om projektet, har frågor eller av annan anledning nå den ansvariga? Kontakta [webmaster(at)f.kth.se](mailto:webmaster@f.kth.se).

--------------------------------------------
