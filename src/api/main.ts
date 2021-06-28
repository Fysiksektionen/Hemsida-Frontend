import { getGETParamsStringFromObject } from '../components/admin/utils';
import { APIResponse } from '../types/general';
import { apiRootUrl, callDelay, useMockApi } from './config';
import route from './mock/router';
import validateResponse, { responseValidatorTypes } from './responseValidtor';

function getAbsoluteURL(path:string) {
    // TODO: This is kinda ugly...
    return (apiRootUrl + '/' + path).replace(/\/\//g, '/').replace(/\/\//g, '/').replace(':/', '://');
}

type ExtendedAPIResponse<T> = APIResponse<T> & {
    validator: responseValidatorTypes,
    isValid: boolean
}

/*
 * GET
 */
type getProps = {
    path: string,
    validator: responseValidatorTypes,
    query?: NodeJS.Dict<string | undefined>
}

/**
 * Returns a static predefined value in apiPathToResp given in api-path.
 * @param path: Path relative to api-root to call
 * @param query: Dict containing GET-args for the call.
 */
export async function get<T>({ path, validator, query }: getProps):Promise<ExtendedAPIResponse<T>> {
    const getParamsString = getGETParamsStringFromObject(query);

    let resp;
    if (useMockApi) { // Mock code
        const routedPath = apiRootUrl + route(path) + getParamsString;
        console.log('[API] (Mock) Fetching: ' + routedPath + '. Routed from:', path);
        // TODO: Check that we got a valid APIResponse<any>.
        resp = await (await fetch(routedPath, {})).json() as unknown as APIResponse<T>;
        // Add delay
        await new Promise(resolve => setTimeout(resolve, callDelay));
    } else {
        const url = getAbsoluteURL(path);
        console.log('[API] Fetching: ' + url);
        resp = await (await fetch(url, {})).json() as unknown as APIResponse<T>;
    }

    // Validate schema.
    const isValid = validateResponse({ response: resp, validator: validator });
    if (isValid) {
        console.log('[API] Response is valid for ' + path);
    } else {
        console.warn('[API] Response schema-check failed for ' + path);
    }
    return { ...resp, validator: validator, isValid: isValid };
}

get.defaultProps = <getProps>{ query: {} };

/*
 * POST
 */
type postProps = {
    path: string,
    query: object
}

export async function post<T>({ path, query }: postProps):Promise<APIResponse<T>> {
    return (await fetch(getAbsoluteURL(path), {
        method: 'POST',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json' }
    })).json() as unknown as APIResponse<T>;
}

export const api = {
    get: get,
    post: post
};
