import Ajv from 'ajv';
import { APIResponse } from '../types/general';
// import { Page } from '../types/api_object_types';

// Schema imports (could in theory be done using a loop. Just make sure that Ajv can properly pre-compile it for performance).
import SiteSchema from './schemas/Site.json';
import PageSchema from './schemas/Page.json';
import NewsPageMinimalSchema from './schemas/NewsPageMinimal.json';
import { API_VERBOSE } from './config';

export type responseValidatorTypes = 'Page' | 'Page[]' | 'NewsPageMinimal[]' | 'Site' | 'none';

// Compile Ajv Schemas
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const elementaryValidators = {
    Page: ajv.compile(PageSchema),
    Site: ajv.compile(SiteSchema),
    NewsPageMinimal: ajv.compile(NewsPageMinimalSchema),
    none: () => true
};

/**
 * Returns a _function_ that checks whether all elements in an array is valid according to the given validator.
 * If the returned function recieves a non-array as input, false is returned.
 * @param validator the validator to test each array element against.
 */
function arrayValidator(validator: Ajv.ValidateFunction):((data: any) => boolean) {
    return (data: any) => {
        return Array.isArray(data) && data.map(d => validator(d)).every(v => v === true);
    };
}

// All validators, both elementary and array-based.
const validators = {
    ...elementaryValidators,
    'Page[]': arrayValidator(elementaryValidators.Page),
    'NewsPageMinimal[]': arrayValidator(elementaryValidators.NewsPageMinimal)
};

type validateProps = {
    response: APIResponse<any>,
    validator: responseValidatorTypes,
}

/**
 * Validates response.data using a validator whose name is given by the validator param string.
 * @param response - the APIResponse<T> whose data property is to bevalidated.
 * @param validator - a string corresponding to the validator to be used.
 * @returns true if validation passes, false otherwise.
 */
export default function validateResponse({ response, validator }:validateProps):boolean {
    if (Object.keys(validators).indexOf(validator) > -1) {
        try {
            return validators[validator](response.data) as boolean; // validator won't return promise if schema is not explicitly stated to be async.
        } catch (err) {
            if (API_VERBOSE) { console.log('[Mock-API] Validation failed. Assuming invalid response. Err' + err.msg); }
            return false;
        }
    } else { // TypeScript should make sure that we never end up here, but you never know...
        if (API_VERBOSE) { console.warn('[Mock-API] Could not find validator: ' + validator + '. Assuming valid response.'); }
        return true;
    }
}
