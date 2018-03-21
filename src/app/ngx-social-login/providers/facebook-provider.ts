import {OauthProvider} from './oauth-provider';
import {Observable} from 'rxjs/Observable';
import {Provider, SocialUser} from '../models';
import {of} from 'rxjs/observable/of';
import {FacebookProviderConfig} from '../models/config/facebook-provider-config';
import {fromPromise} from 'rxjs/observable/fromPromise';

declare const FB: any;

export class FacebookProvider extends OauthProvider {

    constructor(private _config: FacebookProviderConfig) {
        super(Provider.FACEBOOK, '//connect.facebook.net/en_US/sdk.js', () => {
            const initConfig = this._config.initOptions;
            const config = initConfig.version ? initConfig : {...initConfig, ...{version: 'v2.9'}};
            FB.init(config);
        });
    }

    login(): Observable<SocialUser> {
        return fromPromise(
            new Promise((resolve) => {
                FB.login((response: any) => {
                    if (response.authResponse) {
                        const authResponse = response.authResponse;
                        FB.api('/me?fields=name,email,picture,first_name,last_name', (fbUser: any) => {
                            resolve({
                                id: fbUser.id,
                                name: fbUser.name,
                                email: fbUser.email,
                                profileImg: `https://graph.facebook.com/${fbUser.id}/picture?type=normal`,
                                firstName: fbUser.first_name,
                                lastName: fbUser.last_name,
                                accessToken: authResponse.accessToken,
                            } as SocialUser);
                        });
                    }
                }, this._config.loginOptions);
            })
        );
    }

    logout(): Observable<any> {
        return of(FB.logout());
    }

}
