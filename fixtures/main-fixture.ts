import { test as base } from '@playwright/test';
import { CalculatorPage } from '../page-objects/main-page';

export const test = base.extend<{ calculator: CalculatorPage }>({
  calculator: async ({ page }, use) => {
    const calculator = new CalculatorPage(page);
    await calculator.open();
    await use(calculator);
  },
});

export { expect } from '@playwright/test';
