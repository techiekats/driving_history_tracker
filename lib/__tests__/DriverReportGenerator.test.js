"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DriverReportGenerator_1 = __importDefault(require("../types/DriverReportGenerator"));
const Time_1 = __importDefault(require("../types/Time"));
const Trip_1 = __importDefault(require("../types/Trip"));
test('speed < 5 mph not registered', () => {
    const d = new DriverReportGenerator_1.default();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip_1.default(new Time_1.default(2, 0), new Time_1.default(3, 1), 5)]));
    expect(result[0]).toBe('Name: 0 miles');
});
test('speed = 5 mph is registered', () => {
    const d = new DriverReportGenerator_1.default();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip_1.default(new Time_1.default(2, 0), new Time_1.default(3, 0), 5)]));
    expect(result[0]).toBe('Name: 5 miles @5 mph');
});
test('speed > 100 mph not registered', () => {
    const d = new DriverReportGenerator_1.default();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip_1.default(new Time_1.default(2, 0), new Time_1.default(2, 59), 100)]));
    expect(result[0]).toBe('Name: 0 miles');
});
test('speed = 100 mph is registered', () => {
    const d = new DriverReportGenerator_1.default();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip_1.default(new Time_1.default(2, 0), new Time_1.default(3, 0), 100)]));
    expect(result[0]).toBe('Name: 100 miles @100 mph');
});
test('speed between 5mph & 100 mph is registered', () => {
    const d = new DriverReportGenerator_1.default();
    let result = d.getDrivingSummary(new Map().set('Name', [new Trip_1.default(new Time_1.default(2, 0), new Time_1.default(3, 0), 80)]));
    expect(result[0]).toBe('Name: 80 miles @80 mph');
});
test('returns correct average speed', () => {
    const d = new DriverReportGenerator_1.default();
    let trip = [];
    trip.push(new Trip_1.default(new Time_1.default(2, 0), new Time_1.default(3, 0), 80));
    trip.push(new Trip_1.default(new Time_1.default(3, 0), new Time_1.default(3, 30), 50));
    trip.push(new Trip_1.default(new Time_1.default(3, 30), new Time_1.default(4, 0), 45));
    trip.push(new Trip_1.default(new Time_1.default(2, 0), new Time_1.default(2, 59), 100));
    expect(d.getDrivingSummary(new Map().set('Name', trip))[0]).toBe(`Name: 175 miles @${175 * 60 / 120} mph`);
});
