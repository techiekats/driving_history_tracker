import IDriver from "./IDriver";
import ILogger from "./ILogger";

export default interface IDriverFactory {
    CreateDriver(name: string, logger: ILogger) : IDriver;
}