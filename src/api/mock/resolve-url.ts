import { API_VERBOSE } from '../config';

const pathToPageId: { [key: string]: number } = {
    '': 1,
    '/': 1,
    '/start': 1,
    '/index': 1,
    '/hem': 1,
    '/home': 1,
    '/styret': 2,
    '/nyheter': 3,
    '/newsarticle': 4,
    '/fcom': 5,
    '/fortroendevalda': 6
};

export default function resolveUrl({ url }:{url: string}):string {
    const lookupUrl = new URLSearchParams(url.split('?')[1].split('#')[0]).get('path');

    if (API_VERBOSE) console.log('[API] (Mock-ResolveUrl) Lookup URL is: ' + lookupUrl);

    if (lookupUrl !== null && Object.keys(pathToPageId).indexOf(lookupUrl) > -1) {
        return 'pages/' + pathToPageId[lookupUrl] + '.json';
    } else { return '404.json'; }
}
