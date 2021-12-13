export default interface ILogger {
    logWarning (title: string, message? : string): void;
    logException (title: string, exception : string) : void;
}