import Driver from "../types/Driver";
import Time from "../types/Time";
import MockLogger from "./__mocks__/MockLogger";

test('speed < 5 mph not registered', () => {
    const l = new MockLogger();
    const d = new Driver("K", l);
    d.RegisterTrip(new Time(2,0), new Time(3, 1), 5);
    expect(l.warningCalled).toBe(1);
    expect(d.GetAverageSpeed()).toBe(0);
    expect(d.GetTotalDistanceTravelled()).toBe(0);
});
test('speed = 5 mph is registered', () => {
    const l = new MockLogger();
    const d = new Driver("K", l);
    d.RegisterTrip(new Time(2,0), new Time(3, 0), 5);
    expect(l.warningCalled).toBe(0);
    expect(d.GetAverageSpeed()).toBe(5);
    expect(d.GetTotalDistanceTravelled()).toBe(5);
});
test('speed > 100 mph not registered', () => {
    const l = new MockLogger();
    const d = new Driver("K", l);
    d.RegisterTrip(new Time(2,0), new Time(2, 59), 100);
    expect(l.warningCalled).toBe(1);
    expect(d.GetAverageSpeed()).toBe(0);
    expect(d.GetTotalDistanceTravelled()).toBe(0);
});
test('speed = 100 mph is registered', () => {
    const l = new MockLogger();
    const d = new Driver("K", l);
    d.RegisterTrip(new Time(2,0), new Time(3, 0), 100);
    expect(l.warningCalled).toBe(0);
    expect(d.GetAverageSpeed()).toBe(100);
    expect(d.GetTotalDistanceTravelled()).toBe(100);
});
test('speed between 5mph & 100 mph is registered', () => {
    const l = new MockLogger();
    const d = new Driver("K", l);
    d.RegisterTrip(new Time(2,0), new Time(3, 0), 80);
    expect(l.warningCalled).toBe(0);
    expect(d.GetAverageSpeed()).toBe(80);
    expect(d.GetTotalDistanceTravelled()).toBe(80);
});