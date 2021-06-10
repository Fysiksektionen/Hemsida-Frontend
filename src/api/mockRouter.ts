export default function route(apiPath: string):string {
    // Remove leading slash
    if (apiPath.substr(0, 1) === '/') { apiPath = apiPath.substr(1); };
    const defaultRoutes:{[key: string]:string} = {
        'site/': 'site.json',
        'pages/': 'pages.json',
        'pages/1': 'pages/1.json',
        'pages/2': 'pages/2.json',
        'pages/3': 'pages/3.json',
        'pages/4': 'pages/4.json',
        'pages/5': 'pages/5.json'
    };
    if (Object.keys(defaultRoutes).indexOf(apiPath) > -1) { return defaultRoutes[apiPath]; } else { return '404.json'; }
}
