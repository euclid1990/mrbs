"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var emitter_service_1 = require('./../services/emitter.service');
var OpenSearchDirective = (function () {
    function OpenSearchDirective() {
        this.emitter = emitter_service_1.EmitterService.get('channel_search');
    }
    Object.defineProperty(OpenSearchDirective.prototype, "content", {
        set: function (value) {
            this.searchForm = $(value);
        },
        enumerable: true,
        configurable: true
    });
    OpenSearchDirective.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.searchForm.on('click keyup', function (event) {
            if (event.target == this || event.keyCode == 13) {
                self.closeSearch();
            }
        });
        this.searchForm.find('button.search-close').first().on('click', function (event) {
            _this.closeSearch();
        });
    };
    OpenSearchDirective.prototype.onClick = function ($event) {
        $event.preventDefault();
        this.searchForm.addClass('search-open');
        this.searchForm.find('input[type="search"]').first().focus();
    };
    OpenSearchDirective.prototype.closeSearch = function () {
        this.searchForm.removeClass('search-open');
    };
    __decorate([
        core_2.Input('openSearch'), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], OpenSearchDirective.prototype, "content", null);
    OpenSearchDirective = __decorate([
        core_1.Directive({
            selector: '[openSearch]',
            host: {
                '(click)': 'onClick($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], OpenSearchDirective);
    return OpenSearchDirective;
}());
exports.OpenSearchDirective = OpenSearchDirective;
//# sourceMappingURL=open-search.directive.js.map