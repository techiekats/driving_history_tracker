import exp from "constants";
import DriverReportGenerator from "../types/DriverReportGenerator";
import Time from "../types/Time";
import Trip from "../types/Trip";

test('speed < 5 mph not registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(3, 1), 5)]));
    expect(result.length).toBe(0);
});
test('speed = 5 mph is registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(3, 0), 5)]));
    expect(result.length).toBe(1);
});
test('speed > 100 mph not registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(2, 59), 100)]));
    expect(result.length).toBe(0);
});
test('speed = 100 mph is registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(3, 0), 100)]));
    expect(result.length).toBe(1);
});
test('speed between 5mph & 100 mph is registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(3, 0), 80)]));
    expect(result.length).toBe(1);
});
test('returns correct average speed', () => {
    const d = new DriverReportGenerator();
    let trip: Trip[] = [];
    trip.push(new Trip(new Time(2,0), new Time(3, 0), 80))
    trip.push(new Trip(new Time(3,0), new Time(3, 30), 50));
    trip.push(new Trip(new Time(3,30), new Time(4, 0), 45));
    trip.push(new Trip(new Time(2,0), new Time(2, 59), 100));    
    expect(d.getDrivingSummary(new Map().set('Name', trip))[0]).toBe(`Name: 175 miles @ ${175*60/120} mph`);
});