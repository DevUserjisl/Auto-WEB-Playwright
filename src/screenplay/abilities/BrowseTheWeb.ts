import { Page } from '@playwright/test';
import { Ability } from './Ability';

export class BrowseTheWeb implements Ability {
    constructor(public page: Page) {}

    static using(page: Page): BrowseTheWeb {
        return new BrowseTheWeb(page);
    }
}