import { Given, When } from '@cucumber/cucumber';

import { CustomWorld } from '../hooks/world'
import { Navigate } from '../screenplay/tasks/Navigate';


import { Login } from '../screenplay/tasks/Login';

const urlMap: Record<string, string> = {
    URL1: 'https://github.com/',
    URL2: 'https://www.facebook.com/?locale=es_LA',
    URL3: 'https://tercera-url.com',
    URL4: 'https://cuarta-url.com',
};

Given('que el usuario está en la página de login', async function (this: CustomWorld) {
    const urlKey = process.env.URL || 'URL1';
    const url = urlMap[urlKey] || urlMap['URL1'];
    await this.actor.attemptsTo(Navigate.to(url));
});

When('ingresa sus credenciales válidas', async function (this: CustomWorld) {
    await this.actor.attemptsTo(Login.withCredentials('DNI', '12345678', '123wssecret'));
});