import ILogger from "./ILogger";
import Trip from "./Trip";

export default class DriverReportGenerator {
    getDrivingSummary (record: Map<string, Trip[]>): string[] {
        const speedLowerBound = 5;
        const speedUpperBound = 100;
        type driverySummary = {name: string, totalDistance: number, speed:number};
        let temp: driverySummary[] = [];
        const calculateSummary = (s: Trip[]) => {            
            let trips = s.filter(t => t.getSpeed() >= speedLowerBound && t.getSpeed() <= speedUpperBound);
            let totalDistance = 0;
            let totalTime = 0;
            trips.forEach(x=> {totalDistance +=x.getDistance(); totalTime += x.getDuration();});  
            return [totalDistance, totalDistance * 60 / totalTime];
        };           
        for (let [driver, trips] of record) {
            let s = calculateSummary(trips);
            temp.push({name: driver, totalDistance: s[0], speed: s[1]} as driverySummary);
        }
        //sort descending
        temp.sort((a,b)=> b.totalDistance - a.totalDistance);
        // result.sort((a,b) => b.getTotalDistanceTravelled() - a.getTotalDistanceTravelled());
        return temp.filter(t=> t.totalDistance > 0).map(x=> `${x.name}: ${x.totalDistance} miles @ ${x.speed} mph`);        
    }
}