import IDriver from "./IDriver";
import ILogger from "./ILogger";

export default interface IDriverFactory {
    createDriver(name: string, logger: ILogger) : IDriver;
}