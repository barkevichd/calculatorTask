import type {Page} from "@playwright/test";

export async function dismissAdvertisement(page: Page): Promise<void> {
    const candidates = [
      // found by googling, can be changed in future
      page.locator('.fc-cta-consent'),
      page.locator('#onetrust-accept-btn-handler'),
      page.getByRole('button', { name: /accept|agree|ok|got it|close/i }),
      page.locator('.fullinfoclose'),
    ];

    for (const locator of candidates) {
      try {
        if (await locator.first().isVisible({ timeout: 3000 })) {
          await locator.first().click({ timeout: 3000 });
          await page.locator('.fc-consent-root').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
        }
      } catch {
        // we dont care about fail here
      }
    }
  }