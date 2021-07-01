import { getGETParamsStringFromObject } from '../components/admin/utils';
import { APIResponse } from '../types/general';
import { apiRootUrl, callDelay, useMockApi } from './config';
import { HTTPError } from './errors';
import route from './mock/router';
import validateResponse, { responseValidatorTypes } from './responseValidtor';

function getAbsoluteURL(path: string) {
    path = (path.substr(0, 1) === '/') ? path.substr(1) : path;
    const apiRootUrlNoSlash = (apiRootUrl.substr(-1) === '/') ? apiRootUrl.substr(0, apiRootUrl.length - 1) : apiRootUrl;
    return apiRootUrlNoSlash + '/' + path;
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

    let res;
    if (useMockApi) { // Mock code
        const routedPath = apiRootUrl + route(path) + getParamsString;
        console.log('[API] (Mock) Fetching: ' + routedPath + '. Routed from:', path);
        // TODO: Check that we got a valid APIResponse<any>.
        res = await (await fetch(routedPath, {})).json() as unknown as APIResponse<T>;
        // Add delay
        await new Promise(resolve => setTimeout(resolve, callDelay));
    } else {
        const url = getAbsoluteURL(path);
        console.log('[API] Fetching: ' + url);
        const resp = await fetch(url, {});
        // TODO: Decide if we use http status or code from json
        if (resp.ok) {
            res = await resp.json() as unknown as APIResponse<T>;
        } else {
            res = undefined;
            console.log('[API] HTTPError: ' + resp.status); // TODO : add more info here.
            throw new HTTPError(resp.status, 'HTTP error ' + resp.status.toString() + ' (' + (await resp.json()).error + ').');
        }
    }

    // Validate schema.
    const isValid = validateResponse({ response: res, validator: validator });
    if (isValid) {
        console.log('[API] Response is valid for ' + path);
    } else {
        console.warn('[API] Response schema-check failed for ' + path);
    }
    return { ...res, validator: validator, isValid: isValid };
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
