import IDriver from "./IDriver";
import IDriverFactory from "./IDriverFactory";
import ILogger from "./ILogger";
import Time from "./Time";

export default class DrivingInsuranceTracker { 
    private _entries!: Map<string, IDriver>;
    public get entries(): Map<string, IDriver> {
        return this._entries;
    }
    private _factory!: IDriverFactory;
    private _logger!: ILogger;
      
    constructor(factory: IDriverFactory, logger: ILogger) {   
        this._factory = factory;
        this._logger = logger;
        this._entries = new Map();
    }
    
    PopulateEntries (records: string[]) : void {
        records.forEach(x=>{
            let [operation, driver] = x.split(" ");
            if (operation == "Driver") {
                this._entries.set(driver, this._factory.CreateDriver(driver, this._logger));
            }
            else if (operation == "Trip"){
                let [p, q, start, end, dist] = x.split(" ");
                let [a,b] = start.split(':');
                let [y,z] = end.split(':');
                this._entries.get(driver)?.RegisterTrip(new Time(parseInt(a), parseInt(b)), new Time(parseInt(y), parseInt(z)), parseFloat(dist));
            }
            else {
                this._logger.LogWarning("Could not parse input", x);
            }
         });
    }
    GetDrivingSummary (): IDriver[] {
        let result: IDriver[] = [];
        this._entries.forEach((v,k,m)=> result.push(v));
        result.sort((a,b) => b.GetTotalDistanceTravelled() - a.GetTotalDistanceTravelled());
        return result;
    }
}