define(['directives/module'], function (directives) {
    'use strict';

    directives.directive('rippleButton', function () {
        var rippleElement, domElement, x, y,
            elementBoundingClientRect, diagonal;

        return {
            templateUrl: 'views/templates/ripple_button.html',
            restrict: 'E',
            replace: true,
            scope: {
                ngType: '@',
                ngText: '@'
            },
            link: function(scope, element, attributes) {
                rippleElement = element.find('.ripple-effect');
                domElement = element[0];
                elementBoundingClientRect = domElement.getBoundingClientRect();
                rippleElement = domElement.querySelector('.ripple-effect');

                domElement.addEventListener('touchstart',
                    function onTouchStart(evt) {
                        // Stop the previous animation in case of a
                        // quick double click
                        rippleElement.classList.remove('animate');

                        // If it's the first time the user click the button,
                        // width and height parameters must be set
                        if (!rippleElement.clientHeight ||
                            !rippleElement.clientWidth) {
                            diagonal =
                                Math.max(elementBoundingClientRect.height,
                                         elementBoundingClientRect.width);

                            rippleElement.style.height = diagonal + 'px';
                            rippleElement.style.width = diagonal + 'px';
                        }

                        x = evt.touches[0].clientX -
                            elementBoundingClientRect.left - diagonal/2;
                        y = evt.touches[0].clientY -
                            elementBoundingClientRect.top - diagonal/2;

                        rippleElement.style.top = y + 'px';
                        rippleElement.style.left = x + 'px';

                        rippleElement.classList.add('animate');
                });
            }
        };
    });
});