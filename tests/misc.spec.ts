import { test } from '../fixtures/main-fixture';
import { TAG } from '../enums/tags';

test.describe('Miscellaneous', () => {
  test('25. Rapid button clicks', { tag: [TAG.PRIORITY_LOW, TAG.USABILITY] }, async ({ calculator }) => {
    await calculator.enter('123456789');
    await calculator.enter('+-*/');
    await calculator.enter('12-4');
    await calculator.equals();
    await calculator.expectStillRunning();
    await calculator.clear();
    await calculator.enter('8-3');
    await calculator.equals();
    await calculator.expectValue(5);
  });
});
