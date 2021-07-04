import { getGETParamsStringFromObject } from '../components/admin/utils';
import { APIResponse } from '../types/general';
import { API_ROOT_URL, API_VERBOSE } from './config';
import { HTTPError } from './errors';
import validateResponse, { responseValidatorTypes } from './responseValidator';

/**
 * Returns an absolute path to the api call, given a relative api call path.
 * @param path path relative to api root.
 * @returns an absolute path for the api call.
 */
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

/**
 * An extension to APIResponse<T> which also adds validation information.
 */
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
 * Sends a GET-request to the api, and validate the response against a schema.
 * @type T: Should be the same as the validator.
 * @param path: Path relative to api-root to call
 * @param validator: The schema to validate the response against. Use 'none' to ignore schema validation (not recommended).
 * @param query: Dict containing GET-args for the call.
 */
export async function get<T>({ path, validator, query }: getProps):Promise<ExtendedAPIResponse<T>> {
    if (validator === 'none') { log('[API] No validator set for request to: ' + path + '. This is not recommended.'); }

    let result;

    const url = getAbsoluteURL(path) + (query ? '?' + getGETParamsStringFromObject(query) : '');

    log('[API] Fetching: ' + url);
    const response = await fetch(url, {});

    if (response.ok) { // TODO: Decide if we use http status (eg. response.ok) or code from json
        result = await response.json() as unknown as APIResponse<T>;

        // Check if we have a valid APIResponse<any>
        if (result.data === undefined || result.code === undefined) { throw new Error('Server returned a response that does not correspond to a valid APIResponse.'); }
    } else {
        // log('[API] HTTPError: ' + resp.status);
        throw new HTTPError(response.status, 'HTTP error ' + response.status.toString() + ' (' + (await response.json()).error + ').');
    }

    // Schema validation
    const isValid = validateResponse({ response: result, validator: validator });
    if (isValid) {
        if (validator !== 'none') { log('[API] Response is valid for ' + path); }
    } else { console.warn('[API] Response schema-check failed for ' + path); }

    return { ...result, validator: validator, isValid: isValid };
}

get.defaultProps = <getProps>{ query: {} };

/*
 * POST
 */
type postProps = {
    path: string,
    query: object
}

/**
 * Sends a post-request to the api (work in progress).
 * @param path - relative api path for the request
 * @param query - the POST query
 * @returns the server response
 */
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
