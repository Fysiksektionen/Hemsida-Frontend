# API-interface
Det mesta sköts via `api.get<T>({ path, validator, query }`. Notera att `T` och `validator` måste vara samma (fast validator är en string). T är enbart där för att TypeScript inte ska bli sur. Förhoppningsvis går det att inferera typen från `validator` framöver.

## Konfiguration
Sköts i filen [config.ts](config.ts). De fält som kan sättas är för närvarande:
* `useMockApi` - sätts denna till true hanteras HTTP-requests av React-devservern m.h.a. de filer som återfinns i (/public/api)[../public/api]. Sätts den till false används `apiRootUrl` istället.
* `apiRootUrl` - URL:en där api:t återfinns. Mock-api:t har ett prefix som är _/api/_, men det bör noteras att mock-api:t routar om requests till lämplig JSON-fil (se [mock](mock)-mappen).
* `callDelay` - det antal millisekunder som mock-api:t lägger till varje request för att simulera inväntan av svar.

## Validering
Svar av typen `Site`, `Page` och `Page[]` kontrolleras mot JSON-scheman i mappen [schemas](schemas). Dessa genereras med hjälp av filen [updateSchemas.sh](updateSchemas.sh). Framöver bör dessa scheman genereras från [Docs-repot](https://github.com/Fysiksektionen/Hemsida-Docs).