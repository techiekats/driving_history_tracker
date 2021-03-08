class Logger implements ILogger {
    LogWarning(title: string, message?: string): void {
        console.log(title);
        if (!!message) {
            console.log(message);
        }
    }
    LogException(title: string, exception: string): void {
        console.log(title);
        console.log(exception);
    }
}