import { Observable, from } from 'rxjs';
import { OauthProvider } from './oauth-provider';
import { map } from 'rxjs/operators';
import { GoogleProviderConfig } from '../models/config/google-provider-config';
import { Provider } from '../models/provider';
import { SocialUser } from '../models/social-user';

declare const gapi: any;

export class GoogleProvider extends OauthProvider {
    private _googleAuth: any;

    constructor(config: GoogleProviderConfig) {
        super(Provider.GOOGLE, '//apis.google.com/js/platform.js', () => {
            gapi.load('auth2', () => {
                const conf = !config.scope ? { ...config, ...{ scope: 'email' } } : config;
                gapi.auth2.init(conf).then(auth => (this._googleAuth = auth));
            });
        });
    }

    login(): Observable<SocialUser> {
        return from(this._googleAuth.signIn({ prompt: 'select_account' })).pipe(
            map(() => {
                const profile = this._googleAuth.currentUser.get().getBasicProfile();
                const accessToken = this._googleAuth.currentUser.get().getAuthResponse(true).access_token;
                const idToken = this._googleAuth.currentUser.get().getAuthResponse(true).id_token;

                return {
                    id: profile.getId(),
                    email: profile.getEmail(),
                    name: profile.getName(),
                    profileImg: profile.getImageUrl(),
                    accessToken: accessToken,
                    idToken: idToken
                };
            })
        );
    }

    logout(): Observable<any> {
        return Observable.create(observer => observer.complete(this._googleAuth.signOut()));
    }
}
