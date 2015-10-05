define(['directives/module'], function (directives) {
    'use strict';

    directives.directive('navigationBar', function () {
        return {
            templateUrl: 'views/templates/navigation_bar.html',
            restrict: 'E',
            replace: true,
            scope: {
                backAction: '='
            }
        };
    });
});