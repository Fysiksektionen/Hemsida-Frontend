import Ajv from 'ajv';
import { APIResponse } from '../types/general';
// import { Page } from '../types/api_object_types';

// Schema imports (could in theory be done using a loop. Just make sure that Ajv can properly pre-compile it for performance).
import SiteSchema from './schemas/Site.json';
import PageSchema from './schemas/Page.json';

export type responseValidatorTypes = 'Page' | 'Page[]' | 'Site';

// Compile Ajv Schemas
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const validators = {
    Page: ajv.compile(PageSchema),
    Site: ajv.compile(SiteSchema),
    // TODO: Perhaps we should check that data actually is an array. Ideally ajv would have a schema for this.
    'Page[]': (data: any) => data.map(validators.Page).every((v: any) => v === true)
};

type validateProps = {
    response: APIResponse<any>,
    validator: responseValidatorTypes,
}

export default function validateResponse({ response, validator }:validateProps):boolean {
    if (Object.keys(validators).indexOf(validator) > -1) {
        try {
            return validators[validator](response.data) as boolean; // validator won't return promise if schema is not explicitly stated to be async.
        } catch (err) {
            console.log('[Mock-API] Validation failed. Assuming invalid response. Err' + err.msg);
            return false;
        }
    } else { // TypeScript should make sure that we never end up here, but you never know...
        console.warn('[Mock-API] Could not find validator: ' + validator + '. Assuming valid response.');
        return true;
    }
}
