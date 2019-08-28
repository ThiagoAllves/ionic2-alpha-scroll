"use strict";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ionic_angular_1 = require("ionic-angular");
var util_classes_1 = require("./util-classes");
var ion_alpha_scroll_1 = require("./ion-alpha-scroll");
var IonAlphaScrollModule = /** @class */ (function () {
    function IonAlphaScrollModule() {
    }
    IonAlphaScrollModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        util_classes_1.MapToIterable,
                        ion_alpha_scroll_1.IonAlphaScroll
                    ],
                    imports: [
                        ionic_angular_1.IonicModule,
                        common_1.CommonModule
                    ],
                    exports: [
                        util_classes_1.MapToIterable,
                        ion_alpha_scroll_1.IonAlphaScroll
                    ]
                },] },
    ];
    return IonAlphaScrollModule;
}());
exports.IonAlphaScrollModule = IonAlphaScrollModule;
function IonAlphaScrollModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    IonAlphaScrollModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    IonAlphaScrollModule.ctorParameters;
}
//# sourceMappingURL=module.js.map