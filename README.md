# NgxSocialLogin

This module's intention is to provide an easy to use social login service, which can be integrated easily into any environment.

This project has been inspired by [Angularx Social Login](https://github.com/abacritt/angularx-social-login)

## Getting started

### Install via npm/yarn 

```sh
...
```

```sh
...
```

### Import the module

Import `NgxSocialLoginModule` into your `Module`.
You can provide any configuration that is supported by Oauth providers.

Google: 
* https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig

Facebook: 
* https://developers.facebook.com/docs/javascript/reference/FB.init/v2.12
* https://developers.facebook.com/docs/reference/javascript/FB.login/v2.12#params

```javascript
@NgModule({
    declarations: [ ... ],
    imports: [
        ...
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
        ...
    ],
    providers: [ ... ]
})
export class AuthModule {
}
```

### How to use

```javascript
@Component({
  selector: 'app-login-page',
  templateUrl: './app-login-page.component.html',
  styleUrls: ['./app-login-page.component.css']
})
export class LoginPageComponent {

    constructor(private _service: SocialLoginService) {}
  
      loginWithFacebook(): void {
          this._service.login(Provider.FACEBOOK).subscribe(user => console.log(user));
      }
      
      loginWithGoogle(): void {
          this._service.login(Provider.GOOGLE).subscribe(user => console.log(user));
      }
  
      logout(): void {
          this._service.logout().subscribe({
               complete: ()=> console.log('Logout success'),
               error: err => console.log(err)
           });
      }

}
```
