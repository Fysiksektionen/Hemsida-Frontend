/**
 * Mock data for content_trees/PageTypeLoader.tsx
 */
import { Page } from '../types/api_object_types';

export const emptyPage: Page = {
    id: 0,
    detailUrl: '',
    name: '',
    slug: '',
    pageType: '',
    parent: {
        id: 1,
        detailUrl: '',
        name: ''
    },
    children: [],
    published: true,
    publishedAt: '',
    lastEditedAt: '',
    contentSv: {
        id: 0,
        detailUrl: 'https://f.kth.se/api/content_objects/1',
        dbType: 'dict',
        attributes: {},
        items: {}
    },
    contentEn: {
        id: 0,
        detailUrl: 'https://f.kth.se/api/content_objects/1',
        dbType: 'dict',
        attributes: {},
        items: {}
    }
};

export const emptyResp = { code: 404, data: emptyPage };

export const pathToId: { [key: string]: number } = {
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

export const pathToResp: { [key: string]:{code: number, name: string} } = {
    // TODO: Implement this through API call and rename the strings.
    '/': { code: 200, name: '#START' },
    '/start': { code: 200, name: '#START' },
    '/index': { code: 200, name: '#START' },
    '/hem': { code: 200, name: '#START' },
    '/home': { code: 200, name: '#START' },
    '/styret': { code: 200, name: '#STYRET' },
    '/nyheter': { code: 200, name: '#NEWSFEED' },
    '/newsarticle': { code: 200, name: '#NEWSARTICLE' },
    '/fcom': { code: 200, name: '#FCOM' },
    '/fortroendevalda': { code: 200, name: '#REPRESENTATIVES' }
};
