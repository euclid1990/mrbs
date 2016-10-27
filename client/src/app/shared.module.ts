/**
 * This barrel file provides the exports for the common resources (services, components, directives).
 */
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Import HttpModule provider for Http in Config service
import { HttpModule } from '@angular/http';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { OpenSearchDirective } from './directives/open-search.directive';
import { CollapseMenuDirective } from './directives/collapse-menu.directive';
import { ObjectToArrayPipe } from './pipes/object-to-array.pipe';
import { Config } from './config/config';

@NgModule({
    imports: [CommonModule, RouterModule, HttpModule, ReactiveFormsModule ],
    declarations: [OpenSearchDirective, CollapseMenuDirective,
        ObjectToArrayPipe ],
    exports: [OpenSearchDirective, CollapseMenuDirective, ObjectToArrayPipe,
    CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                // Preload server configuration before the application starts
                Config,
                {
                    provide: APP_INITIALIZER,
                    useFactory: (config: Config) => () => config.load(),
                    deps: [Config],
                    multi: true
                },
                AuthService
            ]
        };
    }
}