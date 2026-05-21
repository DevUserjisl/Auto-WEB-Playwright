import { Given, When } from '@cucumber/cucumber';

import {
    actorCalled,
    actorInTheSpotlight,
} from '@serenity-js/core';

import { Navigate } from '@serenity-js/web';
import { Login } from '../screenplay/tasks/Login';

const urlMap: Record<string, string> = {
    URL1: 'https://github.com/',
    URL2: 'https://www.facebook.com/?locale=es_LA',
    URL3: 'https://tercera-url.com',
    URL4: 'https://cuarta-url.com',
};

Given('que el usuario está en la página de login', async function () {

    const urlKey = process.env.URL || 'URL1';
    const url = urlMap[urlKey] || urlMap['URL1'];

    await actorCalled('Usuario').attemptsTo( 
        Navigate.to(url)
    );
});

When('ingresa sus credenciales válidas', async function () {
        //await actorInTheSpotlight().attemptsTo(   
        //Login.withCredentials(
            //'DNI',
            //'12345678',
            //'123wssecret'
        //)
    //);
});