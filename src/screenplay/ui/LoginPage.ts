import { By, PageElement } from '@serenity-js/web';

export const LoginPage = {

    tipoDocumento:
        PageElement.located(
            By.css('#documentType')
        ).describedAs('tipo de documento'),

    documento:
        PageElement.located(
            By.css('#documentNumber-input')
        ).describedAs('documento'),

    password:
        PageElement.located(
            By.css('#password-input')
        ).describedAs('contraseña'),

    loginButton:
        PageElement.located(
            By.css('button:has-text("Ingresar")')
        ).describedAs('botón ingresar'),

    errorMessage:
        PageElement.located(
            By.css('#modal-dialog-label')
        ).describedAs('mensaje de error'),
};