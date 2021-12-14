import DriverReportGenerator from "../types/DriverReportGenerator";
import Time from "../types/Time";
import Trip from "../types/Trip";

test('speed < 5 mph not registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(3, 1), 5)]));
    expect(result[0]).toBe('Name: 0 miles');
});
test('speed = 5 mph is registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(3, 0), 5)]));
    expect(result[0]).toBe('Name: 5 miles @5 mph');
});
test('speed > 100 mph not registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(2, 59), 100)]));
    expect(result[0]).toBe('Name: 0 miles');
});
test('speed = 100 mph is registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(3, 0), 100)]));
    expect(result[0]).toBe('Name: 100 miles @100 mph');
});
test('speed between 5mph & 100 mph is registered', () => {
    const d = new DriverReportGenerator();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip(new Time(2,0), new Time(3, 0), 80)]));
    expect(result[0]).toBe('Name: 80 miles @80 mph');
});
test('returns correct average speed', () => {
    const d = new DriverReportGenerator();
    let trip: Trip[] = [];
    trip.push(new Trip(new Time(2,0), new Time(3, 0), 80))
    trip.push(new Trip(new Time(3,0), new Time(3, 30), 50));
    trip.push(new Trip(new Time(3,30), new Time(4, 0), 45));
    trip.push(new Trip(new Time(2,0), new Time(2, 59), 100));    
    expect(d.getDrivingSummary(new Map().set('Name', trip))[0]).toBe(`Name: 175 miles @${175*60/120} mph`);
});