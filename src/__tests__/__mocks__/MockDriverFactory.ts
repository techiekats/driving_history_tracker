import IDriver from "../../types/IDriver";
import IDriverFactory from "../../types/IDriverFactory";
import ILogger from "../../types/ILogger";
import MockDriver from "./MockDriver";

export default class MockDriverFactory implements IDriverFactory{
    private _callCounter = 0;
    public get callCounter() {
        return this._callCounter;
    }
    
    createDriver(name: string, logger: ILogger): IDriver {
        this._callCounter+= 1;
        return new MockDriver();
    }
}