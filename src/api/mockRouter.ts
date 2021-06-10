export default function route(apiPath: string):string {
    const defaultRoutes:{[key: string]:string} = {
        'site/': 'site.json',
        'pages/': 'pages.json',
        'pages/1': 'pages/1.json',
        'pages/2': 'pages/2.json',
        'pages/3': 'pages/3.json',
        'pages/4': 'pages/4.json',
        'pages/5': 'pages/5.json'
    };
    try {
        return defaultRoutes[apiPath];
    } catch {
        return '404.json';
    }
}
