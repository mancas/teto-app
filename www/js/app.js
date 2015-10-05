define([
    'angular',
    'controllers/index',
    //'services/index',
    'directives/index',
    'factories/index',
    'ngResource',
    'ngCookies',
    'ngSanitize',
    'ngRoute'
], function (ng) {
    'use strict';

    return ng.module('tetoPeloJovenApp', [
        'app.controllers',
        //'app.services',
        'app.directives',
        'app.factories',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ]);
});