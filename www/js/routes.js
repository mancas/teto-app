define(['app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', '$compileProvider',
        function ($routeProvider, $compileProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main_2.html',
                    controller: 'MainCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
    }]);
});
