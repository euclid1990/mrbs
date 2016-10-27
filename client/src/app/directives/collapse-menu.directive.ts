import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[collapseMenu]',
    host: {
        '(click)': 'onClick($event)'
    }
})
export class CollapseMenuDirective {

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    onClick($event) {
        if( $($event.target).is('a') && $($event.target).attr('class') != 'dropdown-toggle' ) {
            (<any>$(this.el.nativeElement)).collapse('hide');
        }
    }
}