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
    const lookupUrl = url.endsWith('/') ? url.substr(12, url.length - 13) : url.substr(12);

    // console.log('[Mock-API/resolveURL] Lookup URL is: ' + url2);

    if (Object.keys(pathToPageId).indexOf(lookupUrl) > -1) {
        return 'pages/' + pathToPageId[lookupUrl] + '.json';
    } else { return '404.json'; }
}
