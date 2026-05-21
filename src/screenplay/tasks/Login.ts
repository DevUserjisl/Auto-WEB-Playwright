import { Task } from '@serenity-js/core';

import {
    Click,
    Enter,
    Select,
} from '@serenity-js/web';

import { LoginPage } from '../ui/LoginPage';

export class Login {

    static withCredentials(
        tipoDocumento: string,
        documento: string,
        contrasena: string
    ) {

        return Task.where(
            '#actor inicia sesión',

            Select.option(tipoDocumento).from(LoginPage.tipoDocumento),

            Enter.theValue(documento)
                .into(LoginPage.documento),

            Enter.theValue(contrasena)
                .into(LoginPage.password),

            Click.on(LoginPage.loginButton),
        );
    }
}