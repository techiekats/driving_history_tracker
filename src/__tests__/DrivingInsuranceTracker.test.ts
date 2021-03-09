import DrivingInsuranceTracker from "../types/DrivingInsuranceTracker";
import MockDriver from "./__mocks__/MockDriver";
import MockDriverFactory from "./__mocks__/MockDriverFactory";
import MockLogger from "./__mocks__/MockLogger";

test('Creates driver objects', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingInsuranceTracker(f, l);
    const inputs = ['Driver K', 'Trip K 08:30 09:30 67'];
    d.GetInsuranceReport(inputs);
    expect(f.callCounter).toBe(1);
  });

  test('Calls register trip with the correct parameters', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingInsuranceTracker(f, l);
    const inputs = ['Driver K', 'Trip K 08:30 09:31 67'];
    d.GetInsuranceReport(inputs);
    const driver: MockDriver = d.entries.get('K') as MockDriver;
    expect(driver._recentTripStart?.hours).toBe(8);
    expect(driver._recentTripEnd?.hours).toBe(9);
    expect(driver._recentTripStart?.minutes).toBe(30);
    expect(driver._recentTripEnd?.minutes).toBe(31);
    expect(driver._recentTripDistance).toBe(67);
  });

  test('Discards operations other than Drive and Trip', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingInsuranceTracker(f, l);
    const inputs = ['Invalid'];
    d.GetInsuranceReport(inputs);
    expect(f.callCounter).toBe(0);
    expect(l.warningCalled).toBe(1);
  });