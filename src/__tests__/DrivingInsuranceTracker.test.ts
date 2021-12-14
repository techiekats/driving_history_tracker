import DrivingHistoryReader from "../types/DrivingHistoryReader";
import MockDriver from "./__mocks__/MockDriver";
import MockDriverFactory from "./__mocks__/MockDriverFactory";
import MockLogger from "./__mocks__/MockLogger";


  test('Discards operations other than Drive and Trip', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryReader();
    const inputs = ['Invalid'];
    d.populateEntries(inputs);
    expect(d.entries.keys.length).toBe(0);
  });
  test('Returns correct list for 0 drivers', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryReader();
    d.populateEntries([]);    
    expect(d.entries.keys.length).toBe(0);
  });
  test('Returns correct list for 1 driver', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryReader();
    const inputs = ['Driver K', 'Trip K 08:30 09:31 67'];
    d.populateEntries(inputs);
    expect(d.entries.keys.length).toBe(1);
  });
  test('Returns correct list for 2 drivers', () => {
    const l = new MockLogger();
    const f = new MockDriverFactory();
    const d = new DrivingHistoryReader();
    const inputs = ['Driver K', 'Trip K 08:30 09:31 67', 'Driver H', 'Trip H 08:35 09:31 67','Trip H 08:35 09:31 67'];
    d.populateEntries(inputs);
    let result = d.entries;
    //TODO
    expect(result.size).toBe(2);
  });