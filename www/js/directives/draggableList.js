define(['directives/module'], function (directives) {
    'use strict';

    directives.directive('draggableList', function (DraggableList, $timeout) {
        var domElement;
        var uuid = 0;
        var draggableElement;

        function initialize(element) {
            domElement = element[0];
            if (!domElement.id) {
                domElement.id = 'draggableList' + (++uuid);
            }
            var maxHeight = DraggableList.getListMaxHeight(domElement);
            domElement.style.maxHeight = maxHeight + 'px';
            draggableElement = DraggableList.initDraggableElement(domElement);
        }

        return {
            templateUrl: 'views/templates/draggable_list.html',
            restrict: 'E',
            replace: true,
            scope: {
                items: '=ngItems'
            },
            link: function(scope, element, attributes) {
                $timeout(function() {
                    initialize(element);
                }, 0);
            }
        };
    });
});