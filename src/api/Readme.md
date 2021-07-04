# API-interface
Det mesta sköts via `api.get<T>({ path, validator, query }`. Notera att `T` och `validator` måste vara samma (fast validator är en string). T är enbart där för att TypeScript inte ska bli sur. Förhoppningsvis går det att inferera typen från `validator` framöver.

## SWR
Som hook används useSwr, vilken importeras genom `import useSwr from 'swr'`. Exempel på användning är:
```js
const { data, error } = useSWR([path], (path) => api.get<T>({ path: apiPath, validator: 'T' }), {});
```
Både `data` och `error` är undefined medan requesten ej är färdig. Lyckas den, sätts `data` till det returnerade värdet, som `ExtendedAPIResponse<T>`, dvs. ett `APIResponse<T>` med ytterligare information om <a href="#validation">valideringen</a>.

I exemplet ovan kallar swr vår anonyma funktion `(path) => callApi<T>({ path: apiPath, validator: 'T' })` med argumenten från listan som ges som första parameter (dvs. `[path]`). Alla argument som kan ändras bör ges via listan, då SWR cachar svaren baserat på dessa. De enda egenskaper som bör vara hårdkodade i den anonyma funktionen är således enbart validatoron och typen `T`, vilka bör vara samma.

## Konfiguration
Sköts i filen [config.ts](config.ts). De fält som kan sättas är för närvarande:
* `API_ROOT_URL` - URL:en där api:t återfinns. Mock-api:t har ett prefix som är _/api/_. Se mappen [mock_backend](../mock_backend) för mer info.
* `API_VERBOSE` - sätt till `true` för att få debug-information om api-calls.

## Validering
<i id="validation"></i>Svar av typen `Site`, `Page`, `Page[]`, `NewsPageMinimal` och `NewsPageMinimal` kontrolleras mot JSON-scheman i mappen [schemas](schemas). Dessa genereras med hjälp av filen [updateSchemas.sh](updateSchemas.sh). I framtiden bör dessa scheman genereras från [Docs-repot](https://github.com/Fysiksektionen/Hemsida-Docs), men den specifikationen är för närvarande under utveckling