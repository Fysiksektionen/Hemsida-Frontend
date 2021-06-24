# API-interface
Det mesta sköts via `callApi<T>({ path, validator, getParams }`. Notera att `T` och `validator` måste vara samma (fast validator är en string). T är enbart där för att TypeScript inte ska bli sur. Förhoppningsvis går det att inferera typen från `validator` framöver.

## Validering
Svar av typen `Site`, `Page` och `Page[]` kontrolleras mot JSON-scheman i mappen [schemas](schemas). Dessa genereras med hjälp av filen [updateSchemas.sh](updateSchemas.sh).