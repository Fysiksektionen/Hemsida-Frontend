/**
 * An error class that also contains an HTTP status code.
 * @property code - the HTTP status code.
 * @property message - the error message.
 */
export class HTTPError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}
