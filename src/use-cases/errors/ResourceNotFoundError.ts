export class ResourceNotFoundErrorError extends Error {
    constructor() {
        super("Resource not found.")
    }
}