import { test } from '../fixtures/main-fixture';
import { TAG } from '../enums/tags';

test.describe('Clear Button', () => {
  test('1. Clear entered number', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('123');
    await calculator.clear();
    await calculator.expectDisplay('0');
  });

  test('2. Clear after calculation', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('8-3');
    await calculator.equals();
    await calculator.expectValue(5);
    await calculator.clear();
    await calculator.expectDisplay('0');
  });

  test('3. Press Clear multiple times', { tag: [TAG.PRIORITY_HIGH, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.clear();
    await calculator.clear();
    await calculator.clear();
    await calculator.expectStillRunning();
    await calculator.expectDisplay('0');
  });

  test('4. Clear during expression entry', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('123-45');
    await calculator.clear();
    await calculator.expectDisplay('0');
  });
});
