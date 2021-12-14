import DrivingHistoryReader from "../types/DrivingHistoryReader";

test('Discards operations other than Drive and Trip', () => {
    const d = new DrivingHistoryReader();
    const inputs = ['Invalid'];
    d.populateEntries(inputs);
    expect(d.entries.size).toBe(0);
  });
  test('Returns correct list for 0 drivers', () => {
    const d = new DrivingHistoryReader();
    d.populateEntries([]);    
    expect(d.entries.size).toBe(0);
  });
  test('Returns correct list for 1 driver', () => {
    const d = new DrivingHistoryReader();
    const inputs = ['Driver K', 'Trip K 08:30 09:31 67'];
    d.populateEntries(inputs);
    expect(d.entries.get('K')?.length).toEqual(1);
    expect(d.entries.size).toBe(1);
  });
  test('Returns correct list for 2 drivers', () => {
    const d = new DrivingHistoryReader();
    const inputs = ['Driver K', 'Trip K 08:30 09:31 67', 'Driver H', 'Trip H 08:35 09:31 67','Trip H 08:35 09:31 67'];
    d.populateEntries(inputs);
    expect(d.entries.size).toBe(2);
  });