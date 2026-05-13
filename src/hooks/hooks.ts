import 'dotenv/config';

import { chromium, firefox, webkit, Browser, BrowserContext } from '@playwright/test';
import { CustomWorld } from './world';
import { Actor } from '../screenplay/Actor';
import { BrowseTheWeb } from '../screenplay/abilities/BrowseTheWeb';
import { Before, After, AfterStep, setWorldConstructor, Status } from '@cucumber/cucumber';
setWorldConstructor(CustomWorld);

let browser: Browser;
let context: BrowserContext;

Before(async function (this: CustomWorld) {
    const navegador = (process.env.NAVEGADOR || 'CHROMIUM').toLowerCase();
    const headless = (process.env.MODOHEADLESS || 'NO').toUpperCase() === 'SI';

    let browserLauncher;
    if (navegador === 'firefox') browserLauncher = firefox;
    else if (navegador === 'webkit') browserLauncher = webkit;
    else browserLauncher = chromium;

    browser = await browserLauncher.launch({ headless });
    context = await browser.newContext();
    this.page = await context.newPage();
    this.actor = Actor.named('Usuario').whoCan(BrowseTheWeb.using(this.page));
});

AfterStep(async function (this: CustomWorld, step) {
    if (this.page) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, 'image/png');
    }
});

After(async function (this: CustomWorld) {
    if (this.page) await this.page.close();
    if (context) await context.close();
    if (browser) await browser.close();
});