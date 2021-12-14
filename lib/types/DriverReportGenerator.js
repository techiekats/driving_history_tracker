"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DriverReportGenerator {
    getDrivingSummary(record) {
        const speedLowerBound = 5;
        const speedUpperBound = 100;
        let temp = [];
        const calculateSummary = (s) => {
            let trips = s.filter(t => t.getSpeed() >= speedLowerBound && t.getSpeed() <= speedUpperBound);
            let totalDistance = 0;
            let totalTime = 0;
            trips.forEach(x => { totalDistance += x.getDistance(); totalTime += x.getDuration(); });
            return [totalDistance, totalDistance * 60 / totalTime];
        };
        for (let [driver, trips] of record) {
            let s = calculateSummary(trips);
            temp.push({ name: driver, totalDistance: s[0], speed: s[1] });
        }
        //sort descending
        temp.sort((a, b) => b.totalDistance - a.totalDistance);
        const toString = (x) => {
            return x.totalDistance > 0 ? `${x.name}: ${x.totalDistance} miles @${x.speed} mph` : `${x.name}: ${x.totalDistance} miles`;
        };
        return temp.map(x => toString(x));
    }
}
exports.default = DriverReportGenerator;
