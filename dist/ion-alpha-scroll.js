"use strict";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_classes_1 = require("./util-classes");
var ionic_angular_1 = require("ionic-angular");
var _ = require("lodash");
var Hammer = require("hammerjs");
var IonAlphaScroll = /** @class */ (function () {
    function IonAlphaScroll(_content, _elementRef, vcRef, events) {
        this._content = _content;
        this._elementRef = _elementRef;
        this.vcRef = vcRef;
        this.events = events;
        this.highlight = false;
        this.sortedItems = {};
        this.alphabet = [];
    }
    /**
     * @return {?}
     */
    IonAlphaScroll.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.setupHammerHandlers();
            _this.setupScrollHandlers();
            _this.alphaScrollGoToList();
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    IonAlphaScroll.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var /** @type {?} */ tmp = {};
        for (var /** @type {?} */ i = 0; i < this.listData.length; i++) {
            var /** @type {?} */ listValue = _.get(this.listData[i], this.key);
            var /** @type {?} */ letter = listValue.toUpperCase().charAt(0);
            if (typeof tmp[letter] === 'undefined') {
                tmp[letter] = [];
            }
            tmp[letter].push({ $implicit: this.listData[i] });
        }
        this.alphabet = this.iterateAlphabet(tmp);
        this.sortedItems = tmp;
    };
    /**
     * @return {?}
     */
    IonAlphaScroll.prototype.calculateScrollDimensions = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ dimensions = this._content.getContentDimensions();
        return {
            height: dimensions.contentHeight + 'px',
            width: (dimensions.contentWidth - 40) + 'px'
        };
    };
    /**
     * @return {?}
     */
    IonAlphaScroll.prototype.calculateDimensionsForSidebar = /**
     * @return {?}
     */
    function () {
        return {
            top: this._content.contentTop + 'px',
            height: (this._content.getContentDimensions().contentHeight - 20) + 'px'
        };
    };
    /**
     * @param {?=} letter
     * @return {?}
     */
    IonAlphaScroll.prototype.alphaScrollGoToList = /**
     * @param {?=} letter
     * @return {?}
     */
    function (letter) {
        if (letter === void 0) { letter = null; }
        if (!letter) {
            var /** @type {?} */ selector = '.ion-alpha-scroll ion-item-divider';
            var /** @type {?} */ letterDivider = this._elementRef.nativeElement.querySelector(selector);
            if (letterDivider) {
                var /** @type {?} */ letterDividerId = letterDivider.id;
                letter = letterDividerId.replace('scroll-letter-', '');
            }
        }
        if (letter) {
            this.triggerChangeLetter(letter);
            var /** @type {?} */ selector = '#scroll-letter-' + util_classes_1.CSSEscape.escape(letter);
            var /** @type {?} */ letterDivider = this._elementRef.nativeElement.querySelector(selector);
            var /** @type {?} */ letterElements = this._elementRef.nativeElement.querySelectorAll('ion-item-divider');
            for (var /** @type {?} */ i = 0; i < letterElements.length; i++) {
                letterElements[i].classList.add("event");
            }
            if (letterDivider) {
                var /** @type {?} */ offsetY = letterDivider.offsetTop;
                var /** @type {?} */ _scrollContent = this._scrollEle._scrollContent.nativeElement;
                _scrollContent.scrollTop = offsetY;
                this.highlightLetter(letter);
            }
        }
    };
    /**
     * @param {?} letter
     * @return {?}
     */
    IonAlphaScroll.prototype.triggerChangeLetter = /**
     * @param {?} letter
     * @return {?}
     */
    function (letter) {
        if (this.currentLetter != letter) {
            this.currentLetter = letter;
            this.events.publish('onChangeLetter', letter);
        }
    };
    /**
     * @param {?} alphabet
     * @return {?}
     */
    IonAlphaScroll.prototype.iterateAlphabet = /**
     * @param {?} alphabet
     * @return {?}
     */
    function (alphabet) {
        var /** @type {?} */ str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var /** @type {?} */ numbers = [];
        if (Object.keys(alphabet).length > 0) {
            str = '';
            for (var /** @type {?} */ i = 0; i < Object.keys(alphabet).length; i++) {
                str += Object.keys(alphabet)[i];
            }
        }
        for (var /** @type {?} */ i = 0; i < str.length; i++) {
            var /** @type {?} */ nextChar = str.charAt(i);
            numbers.push(nextChar);
        }
        return numbers;
    };
    /**
     * @return {?}
     */
    IonAlphaScroll.prototype.setupHammerHandlers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ sidebarEle = this._elementRef.nativeElement.querySelector('.ion-alpha-sidebar');
        if (!sidebarEle)
            return;
        var /** @type {?} */ mcHammer = new Hammer(sidebarEle, {
            recognizers: [
                // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
                [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
            ]
        });
        mcHammer.on('panup pandown', _.throttle(function (e) {
            var /** @type {?} */ closestEle = document.elementFromPoint(e.center.x, e.center.y);
            if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
                var /** @type {?} */ letter = closestEle.innerText;
                if (letter) {
                    _this.alphaScrollGoToList(letter);
                }
            }
        }, 50));
    };
    /**
     * @return {?}
     */
    IonAlphaScroll.prototype.setupScrollHandlers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.highlight)
            return;
        this._scrollEle.addScrollEventListener(function ($e) {
            var /** @type {?} */ offsetY = $e.target.scrollTop;
            var /** @type {?} */ selector = '.ion-alpha-scroll ion-item-divider';
            var /** @type {?} */ letterDividers = _this._elementRef.nativeElement.querySelectorAll(selector);
            for (var /** @type {?} */ i = 0; i < letterDividers.length; i++) {
                if (letterDividers[i].offsetTop <= offsetY) {
                    var /** @type {?} */ letterDivider = letterDividers[i];
                    if (letterDivider) {
                        var /** @type {?} */ letterDividerId = letterDivider.id;
                        var /** @type {?} */ letter = letterDividerId.replace('scroll-letter-', '');
                        _this.highlightLetter(letter);
                    }
                }
            }
        });
    };
    /**
     * @param {?} letter
     * @return {?}
     */
    IonAlphaScroll.prototype.highlightLetter = /**
     * @param {?} letter
     * @return {?}
     */
    function (letter) {
        if (!this.highlight)
            return;
        var /** @type {?} */ letterElements = this._elementRef.nativeElement.querySelectorAll('ion-item-divider');
        for (var /** @type {?} */ i = 0; i < letterElements.length; i++) {
            letterElements[i].classList.remove("event");
        }
        var /** @type {?} */ sidebarLetterElements = this._elementRef.nativeElement.querySelectorAll('.ion-alpha-sidebar li a');
        for (var /** @type {?} */ i = 0; i < sidebarLetterElements.length; i++) {
            sidebarLetterElements[i].classList.remove("selected");
        }
        var /** @type {?} */ letterEl = this._elementRef.nativeElement.querySelector('#sidebar-letter-' + letter);
        letterEl.classList.add("selected");
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    IonAlphaScroll.prototype.trackBySortedItems = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return index;
    };
    IonAlphaScroll.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-alpha-scroll',
                    template: "\n    <ion-scroll class=\"ion-alpha-scroll\" [ngStyle]=\"calculateScrollDimensions()\" scrollX=\"false\" scrollY=\"true\">\n      <ion-item-group class=\"ion-alpha-list-outer\">\n        <div *ngFor=\"let items of sortedItems | mapToIterable; trackBy:trackBySortedItems\">\n          <ion-item-divider id=\"scroll-letter-{{items.key}}\">{{items.key}}</ion-item-divider>\n          <div *ngFor=\"let item of items.value\">\n            <ng-container *ngTemplateOutlet=\"itemTemplate; context: item\"></ng-container>\n          </div>\n        </div>\n      </ion-item-group>\n    </ion-scroll>\n    <ul class=\"ion-alpha-sidebar\" [ngStyle]=\"calculateDimensionsForSidebar()\">\n      <li *ngFor=\"let letter of alphabet\" tappable (click)=\"alphaScrollGoToList(letter)\">\n        <a id=\"sidebar-letter-{{letter}}\">{{letter}}</a>\n      </li>\n    </ul>\n  ",
                    styles: ["\n    .ion-alpha-sidebar {\n      position: fixed;\n      right: 0;\n      display: flex;\n      flex-flow: column;\n      z-index: 50000;\n      margin: 10px 0px;\n    }\n\n    .ion-alpha-sidebar li {\n      flex: 1 1 auto;\n      list-style: none;\n      width: 40px;\n      text-align: center;\n    }\n\n    .ion-alpha-sidebar li a {\n      font-size: 16px;\n    }\n\n    .ion-alpha-sidebar li a.selected {\n      font-weight: bold;\n      font-size: 20px;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    IonAlphaScroll.ctorParameters = function () { return [
        { type: ionic_angular_1.Content, decorators: [{ type: core_1.Host },] },
        { type: core_1.ElementRef, },
        { type: core_1.ViewContainerRef, },
        { type: ionic_angular_1.Events, },
    ]; };
    IonAlphaScroll.propDecorators = {
        "_scrollEle": [{ type: core_1.ViewChild, args: [ionic_angular_1.Scroll,] },],
        "listData": [{ type: core_1.Input },],
        "key": [{ type: core_1.Input },],
        "itemTemplate": [{ type: core_1.Input },],
        "currentPageClass": [{ type: core_1.Input },],
        "highlight": [{ type: core_1.Input },],
        "triggerChange": [{ type: core_1.Input },],
    };
    return IonAlphaScroll;
}());
exports.IonAlphaScroll = IonAlphaScroll;
function IonAlphaScroll_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    IonAlphaScroll.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    IonAlphaScroll.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    IonAlphaScroll.propDecorators;
    /** @type {?} */
    IonAlphaScroll.prototype._scrollEle;
    /** @type {?} */
    IonAlphaScroll.prototype.listData;
    /** @type {?} */
    IonAlphaScroll.prototype.key;
    /** @type {?} */
    IonAlphaScroll.prototype.itemTemplate;
    /** @type {?} */
    IonAlphaScroll.prototype.currentPageClass;
    /** @type {?} */
    IonAlphaScroll.prototype.highlight;
    /** @type {?} */
    IonAlphaScroll.prototype.triggerChange;
    /** @type {?} */
    IonAlphaScroll.prototype.sortedItems;
    /** @type {?} */
    IonAlphaScroll.prototype.alphabet;
    /** @type {?} */
    IonAlphaScroll.prototype.currentLetter;
    /** @type {?} */
    IonAlphaScroll.prototype._content;
    /** @type {?} */
    IonAlphaScroll.prototype._elementRef;
    /** @type {?} */
    IonAlphaScroll.prototype.vcRef;
    /** @type {?} */
    IonAlphaScroll.prototype.events;
}
//# sourceMappingURL=ion-alpha-scroll.js.map