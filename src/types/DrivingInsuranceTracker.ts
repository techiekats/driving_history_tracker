import IDriver from "./IDriver";
import IDriverFactory from "./IDriverFactory";
import ILogger from "./ILogger";
import Time from "./Time";

export default class DrivingInsuranceTracker { 
    _entries!: Map<string, IDriver>;
    _factory!: IDriverFactory;
    _logger!: ILogger;
      
    constructor(factory: IDriverFactory, logger: ILogger) {   
        this._factory = factory;
        this._logger = logger;
        this._entries = new Map();
    }
    GetInsuranceReport (records: string[]) : IDriver[]
    {
        let result : IDriver[] = [];
        this.PopulateEntries(records);
        if (this._entries.size > 0) {
            result = this.GetDrivingSummary();
        }
        return result;
    }
    private PopulateEntries (records: string[]) : void {
        records.forEach(x=>{
            let [operation, driver] = x.split(" ");
            if (operation == "Driver") {
                this._entries.set(driver, this._factory.CreateDriver(driver));
            }
            else if (operation == "Trip"){
                let [p, q, start, end, dist] = x.split("");
                let [a,b] = start.split(':');
                let [y,z] = end.split(':');
                this._entries.get(driver)?.RegisterTrip(new Time(parseInt(a), parseInt(b)), new Time(parseInt(y), parseInt(z)), parseFloat(dist));
            }
            else {
                this._logger.LogWarning("Could not parse input", x);
            }
         });
    }
    private GetDrivingSummary (): IDriver[] {
        let result: IDriver[] = [];
        result.sort((a,b) => a.GetTotalDistanceTravelled() - b.GetTotalDistanceTravelled());
        return result;
    }
}