const pathToPageId = {
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

function resolveUrl(url) {
    if (typeof url === 'string' && Object.keys(pathToPageId).indexOf(url) > -1) {
        return '/pages/' + pathToPageId[url];
    } else return false;
}

module.exports = resolveUrl;
