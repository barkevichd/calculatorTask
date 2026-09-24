import { test } from '../fixtures/main-fixture';
import { TAG } from '../enums/tags';

test.describe('Division', () => {
  test('5. Positive integer division', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('10/2');
    await calculator.equals();
    await calculator.expectValue(5);
  });

  test('6. Decimal result', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('7/2');
    await calculator.equals();
    await calculator.expectValue(3.5);
  });

  test('7. Decimal operands', { tag: [TAG.PRIORITY_HIGH, TAG.HAPPY_PATH] }, async ({ calculator }) => {
    await calculator.enter('5.5/2');
    await calculator.equals();
    await calculator.expectValue(2.75);
  });

  test('8. Division by 1', { tag: [TAG.PRIORITY_HIGH, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('999/1');
    await calculator.equals();
    await calculator.expectValue(999);
  });

  test('9. Zero divided by number', { tag: [TAG.PRIORITY_HIGH, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('0/5');
    await calculator.equals();
    await calculator.expectValue(0);
  });

  test('10. Division by zero', { tag: [TAG.PRIORITY_HIGH, TAG.NEGATIVE] }, async ({ calculator }) => {
    await calculator.enter('10/0');
    await calculator.equals();
    await calculator.expectError();
    await calculator.expectStillRunning();
  });

  test('11. Operator without second operand', { tag: [TAG.PRIORITY_MEDIUM, TAG.NEGATIVE] }, async ({ calculator }) => {
    await calculator.enter('10/');
    await calculator.equals();
    await calculator.expectStillRunning();
  });

  test('12. Division without first operand', { tag: [TAG.PRIORITY_MEDIUM, TAG.NEGATIVE] }, async ({ calculator }) => {
    await calculator.enter('/5');
    await calculator.equals();
    await calculator.expectStillRunning();
  });

  test('13. Very large numbers', { tag: [TAG.PRIORITY_MEDIUM, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('999999999/3');
    await calculator.equals();
    await calculator.expectValue(333_333_333);
  });

  test('14. Small decimal values', { tag: [TAG.PRIORITY_MEDIUM, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('0.0001/0.01');
    await calculator.equals();
    await calculator.expectValue(0.01);
  });

  test('15. Negative number division', { tag: [TAG.PRIORITY_MEDIUM, TAG.EDGE] }, async ({ calculator }) => {
    await calculator.enter('10');
    await calculator.press('±');
    await calculator.enter('/2');
    await calculator.equals();
    await calculator.expectValue(-5);
  });
});
