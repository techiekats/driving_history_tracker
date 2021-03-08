import Driver from "./Driver";
import IDriver from "./IDriver";
import IDriverFactory from "./IDriverFactory";
import ILogger from "./ILogger";

export default class DriverFactory implements IDriverFactory {
    CreateDriver(name: string, logger: ILogger): IDriver {
        return new Driver(name, logger);
    }    
}