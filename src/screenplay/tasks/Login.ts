import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { LoginPage } from '../ui/LoginPage';

export class Login {
    static withCredentials(tipoDocumento: string, documento: string, contrasena: string) {
        return {
            async performAs(actor: Actor): Promise<void> {
                const ability = actor.abilityTo(BrowseTheWeb);
                const page = ability.page;

                await page.selectOption(LoginPage.tipoDocumento, tipoDocumento);
                await page.fill(LoginPage.documento, documento);
                await page.fill(LoginPage.password, contrasena);
                await page.click(LoginPage.loginButton);
            },
        };
    }
}