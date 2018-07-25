import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSocialLoginModule } from 'ngx-social-login';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxSocialLoginModule.init({
      google: {
        client_id: '994632666969-qdss3kuen6iicsm2pe2ooecvpufnrevj.apps.googleusercontent.com'
      },
      facebook: {
        initOptions: {
          appId: '1490265507765668'
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
