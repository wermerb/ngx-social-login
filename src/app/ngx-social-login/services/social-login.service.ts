import {Inject, Injectable} from '@angular/core';
import {OauthProvider} from '../providers/oauth-provider';
import {Observable} from 'rxjs/Observable';
import {Provider, SocialUser} from '../models';
import {ProviderConfig} from '../models/config/provider-config';
import {CONFIG} from '../models/config-injection-token';
import {FacebookProvider} from '../providers/facebook-provider';
import {FacebookProviderConfig} from '../models/config/facebook-provider-config';
import {GoogleProviderConfig} from '../models/config/google-provider-config';
import {GoogleProvider} from '../providers/google-provider';
import {of} from 'rxjs/observable/of';

@Injectable()
export class SocialLoginService {

    private _providers: { [providerId: string]: OauthProvider } = {};

    private _providerInUse: Provider;

    constructor(@Inject(CONFIG) config: ProviderConfig) {
        Object.keys(config).forEach(providerId => {
            const provider = Provider[providerId.toUpperCase()];
            this._providers[provider] = this.oauthProviderFactory(provider, config[providerId]);
        });
    }

    login(provider: Provider): Observable<SocialUser> {
        this._providerInUse = provider;
        const oauthProvider = this._providers[provider];
        return oauthProvider ? oauthProvider.login() : of();
    }

    logout(): Observable<SocialUser> {
        const oauthProvider = this._providers[this._providerInUse];
        return oauthProvider ? oauthProvider.logout() : of();
    }

    private oauthProviderFactory(provider: Provider, config: GoogleProviderConfig | FacebookProviderConfig): OauthProvider {
        switch (provider) {
            case Provider.FACEBOOK:
                return new FacebookProvider(config as FacebookProviderConfig);
            case Provider.GOOGLE:
                return new GoogleProvider(config as GoogleProviderConfig);
        }
    }

}
