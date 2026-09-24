import {expect, type Frame, type Locator, type Page} from '@playwright/test';
import {BUTTONS} from "../enums/buttons";
import {dismissAdvertisement} from "../helpers/dismiss-adv-popup";
import {normalizeString} from "../helpers/string-helper";
import {parseNumber} from "../helpers/number-helper";

export class CalculatorPage {
    private readonly FRAME_SELECTOR = '#fullframe'
    private readonly CANVAS_SELECTOR = '#canvas';

    constructor(private readonly page: Page) {
    }

    private get canvas(): Locator {
        return this.page.frameLocator(this.FRAME_SELECTOR).locator(this.CANVAS_SELECTOR);
    }

    private calculatorIFrame(): Frame {
        const frame = this.page.frame({url: /html5\/online-calculator/});
        if (!frame) {
            throw new Error('Calculator iframe not displayed');
        }
        return frame;
    }

    //open the page and wait till ready
    public async open(): Promise<void> {
        await this.page.goto('/');
        await dismissAdvertisement(this.page);
        await this.canvas.waitFor({state: 'visible'});
        await expect.poll(() => this.readDisplay()).toBe('0');
    }

    //interactions
    public async press(label: string): Promise<void> {
        const position = BUTTONS[label];
        if (!position) {
            throw new Error(`Please use listed buttons: ${label}`);
        }
        await this.canvas.click({
            position: {x: position.x, y: position.y},
        });
    }

    public async enter(charSequence: string): Promise<void> {
        for (const char of charSequence) {
            if (char === ' ') {
                continue;
            }
            await this.press(char);
        }
    }

    public async clear(): Promise<void> {
        await this.press('C');
    }

    public async equals(): Promise<void> {
        await this.press('=');
    }

    //check ready
    public async readDisplay(): Promise<string> {
        return this.calculatorIFrame().evaluate(() => {
            const root = (window as unknown as { exportRoot: { showscreen_txt: { text: string } } }).exportRoot;
            return (root.showscreen_txt.text ?? '').trim();
        });
    }

    public async expectDisplay(expected: string): Promise<void> {
        await expect.poll(async () => normalizeString(await this.readDisplay())).toBe(normalizeString(expected));
    }

    //assertions
    public async expectValue(expected: number): Promise<void> {
        await expect
            .poll(async () => parseNumber(await this.readDisplay()))
            .toBe(expected);
    }

    public async expectError(): Promise<void> {
        await expect.poll(async () => normalizeString(await this.readDisplay())).toBe('error');
    }

    public async expectStillRunning(): Promise<void> {
        await expect(this.canvas).toBeVisible();
        const display = await this.readDisplay();
        expect(display.length).toBeGreaterThan(0);
    }
}
