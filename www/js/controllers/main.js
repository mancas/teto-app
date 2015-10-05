define(['controllers/module'], function (controllers) {
    'use strict';
    controllers.controller('MainCtrl', function ($scope) {
        $scope.name = 'Manu';

        var testCount = 220;


        $scope.testList = [];
        for (var i = 0; i < testCount; i++) {
            $scope.testList.push({
                text: 'Cita ' + i
            });
        }
    });
});
