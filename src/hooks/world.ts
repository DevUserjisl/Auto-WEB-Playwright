import { World } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { Actor } from '../screenplay/Actor';

export class CustomWorld extends World {
    page!: Page;
    actor!: Actor;
}