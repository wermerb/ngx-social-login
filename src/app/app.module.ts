import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxSocialLoginModule} from './ngx-social-login';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxSocialLoginModule.init(
            {
                google: {
                    client_id: 'YOUR_CLIENT_ID'
                },
                facebook: {
                    initOptions: {
                        appId: 'YOUR_APP_ID'
                    }
                }
            }
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
