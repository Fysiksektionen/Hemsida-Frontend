import { getGETParamsStringFromObject } from '../components/admin/utils';
import { APIResponse } from '../types/general';
import { apiRootUrl, callDelay } from './config';
import route from './mock/router';

/**
 * This file is just a placeholder to a real APIMethod.
 */

type CallApiProps = {
    path: string,
    getParams?: NodeJS.Dict<string|undefined>
}

/**
 * Returns a static predefined value in apiPathToResp given a n api-path.
 * @param path: Path relative to api-root to call
 * @param getParams: Dict containing GET-args for the call.
 */
export default async function callApi<T>({ path, getParams }: CallApiProps): Promise<APIResponse<T>> {
    const getParamsString = getGETParamsStringFromObject(getParams);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fullPath = apiRootUrl + path + getParamsString;

    // BEGIN Mock code
    const routedPath = apiRootUrl + route(path) + getParamsString;
    console.log('[Mock-API] Fetching: ' + routedPath + '. Routed from:', path);
    // TODO: Type-checks need to be done here.
    const resp = (await fetch(routedPath, {})).json() as unknown as APIResponse<T>;
    // Add delay
    await new Promise(resolve => setTimeout(resolve, callDelay));
    // END Mock code

    return resp;
};

callApi.defaultProps = <CallApiProps>{
    path: '',
    getParams: {}
};
