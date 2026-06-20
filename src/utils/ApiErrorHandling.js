class ApiErrorHandling extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        statck = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (statck) {
            this.stack = statck
        } else {
            error.captureStatckTrace(this, this.constructor);
        }
    }
}

export default ApiErrorHandling;