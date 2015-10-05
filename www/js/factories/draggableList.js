define(['factories/module'], function (factories) {
    'use strict';

    factories.factory('DraggableList', function () {
        var PROPERTIES = [
            'padding-top',
            'padding-bottom',
            'margin-top',
            'margin-bottom',
            'border-top',
            'border-bottom'
        ];

        var list;

        function getListMaxHeight(element) {
            var listElements = element.querySelectorAll('li');
            var height = _getSingleItemHeight(listElements);
            // Save list to keep in mind the scroll position when trying
            // to close the draggable list
            list = element.querySelector('ul');

            var extraSpace = _calculateExtraSpace(element);

            var listHeight = height * listElements.length;
            var header = document.querySelector('header');
            var windowHeight = window.innerHeight -
                header.getBoundingClientRect().height;
            if (listHeight + extraSpace > windowHeight) {
                return windowHeight;
            } else {
                return listHeight + extraSpace;
            }
        }

        function _getSingleItemHeight(listItems) {
            var singleItem = listItems[0];
            return singleItem.getBoundingClientRect().height;
        }

        function _calculateExtraSpace(element) {
            var extraElements =
                document.querySelectorAll('#' + element.id + ' > *:not(ul)');
            var extraSpace = 0;
            Array.prototype.forEach.call(extraElements,
                function(ele) {
                if (ele.nodeName === 'UL') {
                    return;
                }
                extraSpace += _getStyleProperty(ele, 'height');
            });

            Array.prototype.forEach.call(PROPERTIES, function(prop) {
                extraSpace += _getStyleProperty(element, prop);
            });

            return extraSpace;
        }

        function _getStyleProperty(element, property) {
            var style = window.getComputedStyle(element, null);
            return parseInt(style.getPropertyValue(property), 10);
        }

        var Draggable = function (element) {
            this._element = element;
            this._currentPositionY = null;
            this._currentHeight = null;
            this.list = element.querySelector('ul');
            this._element.dataset.draggable = true;
            this._element.addEventListener('touchstart',
                this.handleDragStart.bind(this), false);
            this._element.addEventListener('touchmove',
                this.handleDrag.bind(this), false);
            this._element.addEventListener('touchend',
                this.handleDrop.bind(this), false);
            this._element.addEventListener('transitionend', function () {
                this._element.classList.remove('animation');
            }.bind(this));
        };

        Draggable.prototype.hasScroll = function() {
            return this.list.clientHeight < this.list.scrollHeight;
        };

        Draggable.prototype.canPerformDragAction = function() {
            return (!(this.hasScroll() && this.list.scrollTop !== 0));
        };

        Draggable.prototype.toggleDragging = function() {
            this._dragging = !this._dragging;
        };

        Draggable.prototype.handleDragStart = function(evt) {
            this.toggleDragging();
            this._element.classList.add('dragging');
            this._currentPositionY = evt.touches[0].clientY;
            return false;
        };

        Draggable.prototype.handleDrag = function(evt) {
            if (this._dragging && this.canPerformDragAction()) {
                var incY =  this._currentPositionY - evt.touches[0].clientY;
                var elemY = parseInt(this._element.clientHeight) + incY;
                // Update current position
                this._currentPositionY = evt.touches[0].clientY;
                this._currentHeight = elemY;
                if (elemY >= parseInt(this._element.style.maxHeight, 10)) {
                    this._element.dataset.open = true;
                    return false;
                } else if (elemY <=
                    _getStyleProperty(this._element, 'min-height')) {
                    this._element.dataset.open = false;
                    return false;
                }
                this._element.style.height = elemY + 'px';
                return false;
            }
            return true;
        };

        Draggable.prototype.handleDrop = function() {
            this.toggleDragging();
            this._element.classList.remove('dragging');
            var midElementHeight =
                parseInt(this._element.style.maxHeight, 10) / 2;
            this._element.classList.add('animation');
            if (this._currentHeight > midElementHeight) {
                this._element.style.height = this._element.style.maxHeight;
                this._element.dataset.open = true;
            } else {
                this._element.style.height = '';
                this._element.dataset.open = false;
                this.list.scrollTop = 0;
            }
            return false;
        };

        function init(element) {
            return new Draggable(element);
        }

        return {
            'getListMaxHeight': getListMaxHeight,
            'initDraggableElement': init
        };
    });
});