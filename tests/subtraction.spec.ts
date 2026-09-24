import { test } from '../fixtures/main-fixture';
import { TAG } from '../enums/tags';

test.describe('Subtraction', () => {
  test('16. Positive integers', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('10-3');
    await calculator.equals();
    await calculator.expectValue(7);
  });

  test('17. Result equals zero', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('5-5');
    await calculator.equals();
    await calculator.expectValue(0);
  });

  test('18. Decimal subtraction', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('10.5-2.5');
    await calculator.equals();
    await calculator.expectValue(8);
  });

  test('19. Subtract zero', { tag: [TAG.PRIORITY_MEDIUM, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('50-0');
    await calculator.equals();
    await calculator.expectValue(50);
  });

  test('20. Missing second operand', { tag: [TAG.PRIORITY_HIGH, TAG.NEGATIVE] }, async ({ calculator }) => {
    await calculator.enter('10-');
    await calculator.equals();
    await calculator.expectStillRunning();
  });

  test('21. Missing first operand', { tag: [TAG.PRIORITY_MEDIUM, TAG.NEGATIVE] }, async ({ calculator }) => {
    await calculator.enter('-');
    await calculator.equals();
    await calculator.expectStillRunning();
  });

  test('22. Negative result', { tag: [TAG.PRIORITY_HIGH, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('3-10');
    await calculator.equals();
    await calculator.expectValue(-7);
  });

  test('23. Negative number subtraction', { tag: [TAG.PRIORITY_MEDIUM, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('5');
    await calculator.press('±');
    await calculator.press('-');
    await calculator.enter('3');
    await calculator.press('±');
    await calculator.equals();
    await calculator.expectValue(-2);
  });

  test('24. Large numbers', { tag: [TAG.PRIORITY_LOW, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('999999999-1');
    await calculator.equals();
    await calculator.expectValue(999_999_998);
  });
});
