import Time from "./Time";
import Trip from "./Trip";

export default class DrivingHistoryReader { 
    readonly #_entries: Map<string, Trip[]> = new Map();
    public get entries(): Map<string, Trip[]> {
        return this.#_entries;
    }
      
    populateEntries (records: string[]) : void {
        records.forEach(x=>{
            let [operation, driver] = x.split(" ");
            if (operation == "Driver") {
                this.#_entries.set(driver, []);
            }
            else if (operation == "Trip"){
                let [p, q, start, end, dist] = x.split(" ");
                let [a,b] = start.split(':');
                let [y,z] = end.split(':');
                this.#_entries.get(driver)?.push(new Trip(new Time(parseInt(a), parseInt(b)), new Time(parseInt(y), parseInt(z)), parseFloat(dist))); 
            }
         });
    }
}