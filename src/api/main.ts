import { getGETParamsStringFromObject } from '../components/admin/utils';
import { APIResponse } from '../types/general';
import { apiRootUrl, callDelay } from './config';
import route from './mock/router';
import validateResponse, { responseValidatorTypes } from './responseValidtor';

// TODO: Generalize to allow for POST requests, etc.
type CallApiProps = {
    path: string,
    validator: responseValidatorTypes,
    getParams?: NodeJS.Dict<string|undefined>
}

/**
 * Returns a static predefined value in apiPathToResp given a n api-path.
 * @param path: Path relative to api-root to call
 * @param getParams: Dict containing GET-args for the call.
 */
export default async function callApi<T>({ path, validator, getParams }: CallApiProps): Promise<APIResponse<T>> {
    const getParamsString = getGETParamsStringFromObject(getParams);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fullPath = apiRootUrl + path + getParamsString;

    // BEGIN Mock code
    const routedPath = apiRootUrl + route(path) + getParamsString;
    console.log('[Mock-API] Fetching: ' + routedPath + '. Routed from:', path);
    // TODO: Check that we got a valid APIResponse<any>.
    const resp = await (await fetch(routedPath, {})).json() as unknown as APIResponse<any>;
    // Add delay
    await new Promise(resolve => setTimeout(resolve, callDelay));
    // END Mock code

    // Validate schema.
    const respIsValid = validateResponse({ response: resp, validator: validator });
    console.log('[Mock-API] Response is ' + (respIsValid ? '' : 'in') + 'valid for ' + routedPath);

    return resp;
};

callApi.defaultProps = <CallApiProps>{
    path: '',
    getParams: {}
};
