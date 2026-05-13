import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Navigate {
    static to(url: string) {
        return {
            async performAs(actor: Actor): Promise<void> {
                const ability = actor.abilityTo(BrowseTheWeb);
                await ability.page.goto(url);
            },
        };
    }
}