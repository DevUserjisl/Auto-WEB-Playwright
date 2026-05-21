import 'dotenv/config';

import {
    Before,
    AfterAll,
} from '@cucumber/cucumber';

import {
    Actor,
    Cast,
    engage,
} from '@serenity-js/core';

import {
    BrowseTheWebWithPlaywright,
} from '@serenity-js/playwright';

import {
    chromium,
    firefox,
    webkit,
} from 'playwright';

import type { Browser } from 'playwright';

import { serenity } from '@serenity-js/core';

import '../../serenity.conf';

let browser: Browser;

/**
 * Se ejecuta antes de cada escenario
 */
Before(async function () {

    const navegador =
        (process.env.NAVEGADOR || 'CHROMIUM').toLowerCase();

    const headless =
        (process.env.MODOHEADLESS || 'NO').toUpperCase() === 'SI';

    let browserLauncher;

    if (navegador === 'firefox') {
        browserLauncher = firefox;
    } else if (navegador === 'webkit') {
        browserLauncher = webkit;
    } else {
        browserLauncher = chromium;
    }

    browser = await browserLauncher.launch({ headless });

    class OnlineCast implements Cast {
        prepare(actor: Actor): Actor {
            return actor.whoCan(
                BrowseTheWebWithPlaywright.using(browser)
            );
        }
    }

    engage(new OnlineCast());
});

AfterAll(async function () {
    await browser.close();
});