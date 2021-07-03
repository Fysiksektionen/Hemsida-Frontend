import { getGETParamsStringFromObject } from '../components/admin/utils';
import { APIResponse } from '../types/general';
import { API_ROOT_URL, API_VERBOSE, USE_MOCK_API } from './config';
import { HTTPError } from './errors';
import callMockApi from './mock/mockApi';
import validateResponse, { responseValidatorTypes } from './responseValidator';

function getAbsoluteURL(path: string) {
    path = (path.substr(0, 1) === '/') ? path.substr(1) : path;
    const apiRootUrlNoSlash = (API_ROOT_URL.substr(-1) === '/') ? API_ROOT_URL.substr(0, API_ROOT_URL.length - 1) : API_ROOT_URL;
    return apiRootUrlNoSlash + '/' + path;
}

/**
 * Prints a string using `console.log`, if API_VERBOSE is set to true.
 * @param s - The string to be printed.
 */
function log(s: string): void { if (API_VERBOSE) { console.log(s); } }

export type ExtendedAPIResponse<T> = APIResponse<T> & {
    validator: responseValidatorTypes,
    isValid: boolean
}

/*
 * GET
 */
export type getProps = {
    path: string,
    validator: responseValidatorTypes,
    query?: NodeJS.Dict<string | undefined>
}

/**
 * Sends a GET-request to the api.
 * @type T: Should be the same as the validator.
 * @param path: Path relative to api-root to call
 * @param validator: The schema to validate the response against. Use 'none' to ignore schema validation (not recommended).
 * @param query: Dict containing GET-args for the call.
 */
export async function get<T>({ path, validator, query }: getProps):Promise<ExtendedAPIResponse<T>> {
    if (validator === 'none') { log('[API] No validator set for request to: ' + path + '. This is not recommended.'); }

    let res;
    if (USE_MOCK_API) { // Mock code
        res = await callMockApi<T>({ path, validator });
    } else { // Non-mock
        const url = getAbsoluteURL(path) + '?' + getGETParamsStringFromObject(query);
        log('[API] Fetching: ' + url);
        const resp = await fetch(url, {});
        // TODO: Decide if we use http status or code from json
        if (resp.ok) {
            // TODO: Check that we got a valid APIResponse<any>.
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
        if (validator !== 'none') { log('[API] Response is valid for ' + path); }
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
