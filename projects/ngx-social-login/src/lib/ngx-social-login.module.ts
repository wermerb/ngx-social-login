import {ModuleWithProviders, NgModule} from '@angular/core';
import {SocialLoginService} from './services/social-login.service';
import {ProviderConfig} from './models/config/provider-config';
import {CONFIG} from './models/config-injection-token';

@NgModule({
    providers: [SocialLoginService]
})
export class NgxSocialLoginModule {

    static init(config: ProviderConfig): ModuleWithProviders {
        return {
            ngModule: NgxSocialLoginModule,
            providers: [
                {provide: CONFIG, useValue: config}
            ]
        };
    }
}
