import { ElementRef, ViewContainerRef, SimpleChange } from '@angular/core';
import { Content, Scroll } from 'ionic-angular';
export declare class IonAlphaScroll {
    private _content;
    private _elementRef;
    private vcRef;
    _scrollEle: Scroll;
    listData: any;
    key: string;
    itemTemplate: ElementRef;
    currentPageClass: any;
    highlight: boolean;
    triggerChange: any;
    sortedItems: any;
    alphabet: any;
    constructor(_content: Content, _elementRef: ElementRef, vcRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    calculateScrollDimensions(): {
        height: string;
        width: string;
    };
    calculateDimensionsForSidebar(): {
        top: string;
        height: string;
    };
    alphaScrollGoToList(letter?: string): void;
    iterateAlphabet(alphabet: any): any[];
    setupHammerHandlers(): void;
    setupScrollHandlers(): void;
    highlightLetter(letter: string): void;
    trackBySortedItems(index: number, item: any): number;
}
