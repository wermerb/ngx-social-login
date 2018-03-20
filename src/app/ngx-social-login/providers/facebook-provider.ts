import {OauthProvider} from './oauth-provider';
import {Observable} from 'rxjs/Observable';
import {Provider, SocialUser} from '../models';
import {of} from 'rxjs/observable/of';
import {FacebookProviderConfig} from '../models/config/facebook-provider-config';

declare const FB: any;

export class FacebookProvider extends OauthProvider {

    constructor(private _config: FacebookProviderConfig) {
        super(Provider.FACEBOOK, '//connect.facebook.net/en_US/sdk.js', () => {
            const config = this._config.version ? this._config : {...this._config, ...{version: 'v2.9'}};
            FB.init(config);
        });
    }

    login(): Observable<SocialUser> {
        return of(
            FB.login((response: any) => {
                if (response.authResponse) {
                    const authResponse = response.authResponse;
                    FB.api('/me?fields=name,email,picture,first_name,last_name', (fbUser: any) => {
                        return {
                            id: fbUser.id,
                            name: fbUser.name,
                            email: fbUser.email,
                            profileImg: `https://graph.facebook.com/${fbUser.id}/picture?type=normal`,
                            firstName: fbUser.first_name,
                            lastName: fbUser.last_name,
                            accessToken: authResponse.accessToken,
                        } as SocialUser;
                    });
                }
            }, this._config)
        );
    }

    logout(): Observable<any> {
        return of(FB.logout());
    }

}
