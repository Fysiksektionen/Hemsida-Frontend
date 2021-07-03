import { getGETParamsStringFromObject } from '../../components/admin/utils';
import { APIResponse } from '../../types/general';
import { API_VERBOSE, MOCK_API_CALL_DELAY } from '../config';
import { HTTPError } from '../errors';
import { getProps } from '../main';
import route from './router';

export default async function callMockApi<T>({ path, query }: getProps):Promise<APIResponse<T>> {
    const routedPath = '/api/' + route(path) + getGETParamsStringFromObject(query);

    if (API_VERBOSE) console.log('[API] (Mock) Fetching: ' + routedPath + '. Routed from: ' + path);

    const res = await (await fetch(routedPath, {})).json() as unknown as APIResponse<T>;

    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, MOCK_API_CALL_DELAY));

    if (res.code > 299) { throw new HTTPError(res.code, 'Mock API Emulated error'); }
    return res;
}
