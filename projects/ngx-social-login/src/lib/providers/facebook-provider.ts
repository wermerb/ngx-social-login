import { OauthProvider } from './oauth-provider';
import { bindCallback, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FacebookProviderConfig } from '../models/config/facebook-provider-config';
import { SocialUser } from '../models/social-user';
import { Provider } from '../models/provider';

declare const FB: any;

export class FacebookProvider extends OauthProvider {
    constructor(private _config: FacebookProviderConfig) {
        super(Provider.FACEBOOK, '//connect.facebook.net/en_US/sdk.js', () => {
            const initConfig = this._config.initOptions;
            const config = initConfig.version ? initConfig : { ...initConfig, ...{ version: 'v2.9' } };
            FB.init(config);
        });
    }

    login(): Observable<SocialUser> {
        return bindCallback((cb) => FB.login(cb, this._config.loginOptions))().pipe(
            mergeMap((loginResponse: any) =>
                bindCallback((cb) => FB.api('/me?fields=name,email,picture,first_name,last_name', cb))().pipe(
                    map((meResponse: any) => ({
                            id: meResponse.id,
                            name: meResponse.name,
                            email: meResponse.email,
                            profileImg: `https://graph.facebook.com/${meResponse.id}/picture?type=normal`,
                            firstName: meResponse.first_name,
                            lastName: meResponse.last_name,
                            idToken: loginResponse.authResponse.signedRequest,
                            accessToken: loginResponse.authResponse.accessToken
                        } as SocialUser)
                    ))
            ));
    }

    logout(): Observable<any> {
        FB.logout();
        return of(true);
    }
}
