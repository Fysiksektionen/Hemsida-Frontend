import { getGETParamsStringFromObject } from '../components/admin/utils';
import { APIResponse } from '../types/general';
import { API_ROOT_URL, API_VERBOSE, MOCK_API_CALL_DELAY, USE_MOCK_API } from './config';
import { HTTPError } from './errors';
import route from './mock/router';
import validateResponse, { responseValidatorTypes } from './responseValidtor';

function getAbsoluteURL(path: string) {
    path = (path.substr(0, 1) === '/') ? path.substr(1) : path;
    const apiRootUrlNoSlash = (API_ROOT_URL.substr(-1) === '/') ? API_ROOT_URL.substr(0, API_ROOT_URL.length - 1) : API_ROOT_URL;
    return apiRootUrlNoSlash + '/' + path;
}

function log(s: string): void { if (API_VERBOSE) { console.log(s); } }

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
    if (USE_MOCK_API) { // Mock code
        const routedPath = API_ROOT_URL + route(path) + getParamsString;
        log('[API] (Mock) Fetching: ' + routedPath + '. Routed from: ' + path);
        // TODO: Check that we got a valid APIResponse<any>.
        res = await (await fetch(routedPath, {})).json() as unknown as APIResponse<T>;
        // Add delay
        await new Promise(resolve => setTimeout(resolve, MOCK_API_CALL_DELAY));
        if (res.code > 299) { throw new HTTPError(res.code, 'Mock API Emulated error'); }
    } else {
        const url = getAbsoluteURL(path);
        log('[API] Fetching: ' + url);
        const resp = await fetch(url, {});
        // TODO: Decide if we use http status or code from json
        if (resp.ok) {
            res = await resp.json() as unknown as APIResponse<T>;
        } else {
            res = undefined;
            log('[API] HTTPError: ' + resp.status); // TODO : add more info here.
            throw new HTTPError(resp.status, 'HTTP error ' + resp.status.toString() + ' (' + (await resp.json()).error + ').');
        }
    }

    // Validate schema.
    const isValid = validateResponse({ response: res, validator: validator });
    if (isValid) {
        log('[API] Response is valid for ' + path);
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
