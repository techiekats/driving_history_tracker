class DrivingInsuranceTracker { 
    _entries!: Map<string, IDriver>;
    _factory!: IDriverFactory;
      
    constructor(factory: IDriverFactory) {   
        this._factory = factory;
        this._entries = new Map();
    }
    GetInsuranceReport (records: string[]) : string
    {
        let result : string = "";
        records.forEach(x=>{
           let [operation, driver] = x.split(" ");
           if (operation == "Driver") {
               this._entries.set(driver, this._factory.CreateDriver(driver));
           }
           else {
               let [p, q, start, end, dist] = x.split("");
               this._entries.get(driver)?.RegisterTrip(new Date(start), new Date(end), parseFloat(dist));
           }
        });
        return result;
    }
    
}