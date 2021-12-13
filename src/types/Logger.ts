import ILogger from "./ILogger";

export default class Logger implements ILogger {
    logWarning(title: string, message?: string): void {
        if (!!message) {
            console.log(`${title} : ${message}`);
        }
        else {
            console.log(title);
        }
    }
    logException(title: string, exception: string): void {
        console.log(title);
        console.log(exception);
    }
}