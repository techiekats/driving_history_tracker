import DrivingHistoryTracker from "../types/DrivingHistoryTracker";
import MockDriver from "./__mocks__/MockDriver";
import MockDriverFactory from "./__mocks__/MockDriverFactory";
import MockLogger from "./__mocks__/MockLogger";

test('Creates driver objects', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryTracker(f, l);
    const inputs = ['Driver K', 'Trip K 08:30 09:30 67'];
    d.populateEntries(inputs);
    const driver: MockDriver = d.entries.get('K') as MockDriver;
    expect(f.callCounter).toBe(1);
    expect(driver._registerTripCallCounter).toBe(1);
  });

  test('Calls register trip with the correct parameters', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryTracker(f, l);
    const inputs = ['Driver K', 'Trip K 08:30 09:31 67.6'];
    d.populateEntries(inputs);
    const driver: MockDriver = d.entries.get('K') as MockDriver;
    expect(driver._recentTripStart?.hours).toBe(8);
    expect(driver._recentTripEnd?.hours).toBe(9);
    expect(driver._recentTripStart?.minutes).toBe(30);
    expect(driver._recentTripEnd?.minutes).toBe(31);
    expect(driver._recentTripDistance).toBe(67.6);
  });

  test('Discards operations other than Drive and Trip', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryTracker(f, l);
    const inputs = ['Invalid'];
    d.populateEntries(inputs);
    expect(f.callCounter).toBe(0);
    expect(l.warningCalled).toBe(1);
  });
  test('Returns correct list for 0 drivers', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryTracker(f, l);
    d.populateEntries([]);
    let result = d.getDrivingSummary();
    expect(result.length).toBe(0);
  });
  test('Returns correct list for 1 driver', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryTracker(f, l);
    const inputs = ['Driver K', 'Trip K 08:30 09:31 67'];
    d.populateEntries(inputs);
    let result = d.getDrivingSummary();
    expect(result.length).toBe(1);
  });
  test('Returns correct list for 2 drivers', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryTracker(f, l);
    const inputs = ['Driver K', 'Trip K 08:30 09:31 67', 'Driver H', 'Trip H 08:35 09:31 67','Trip H 08:35 09:31 67'];
    d.populateEntries(inputs);
    let result = d.getDrivingSummary();
    expect(result.length).toBe(2);
  });