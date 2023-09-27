export class ExceptionClass extends Error {
    status: number;
    exception: unknown

    constructor(message?: string, status?: number, exception?: unknown) {
        super(message)
        this.status = status || 500
        this.exception = exception

        // Fixes the object prototype to guarantee that 'instanceof' works properly
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class Unauthorized extends ExceptionClass {
    constructor(message: string, exception?: unknown) {
        super(message, 401, exception)
    }
}

export class NotFound extends ExceptionClass {
    constructor(message: string, exception?: unknown) {
        super(message, 404, exception)
    }
}

export class DatabaseError extends ExceptionClass {
    constructor(message: string, exception?: unknown) {
        super(message, 500, exception)
    }
}

export class Conflict extends ExceptionClass {
    constructor(message: string, exception?: unknown) {
        super(message, 409, exception)
    }
}