import { Inject, Injectable } from '@angular/core';
import { OauthProvider } from '../providers/oauth-provider';
import { Observable, EMPTY } from 'rxjs';
import { ProviderConfig } from '../models/config/provider-config';
import { CONFIG } from '../models/config-injection-token';
import { FacebookProvider } from '../providers/facebook-provider';
import { FacebookProviderConfig } from '../models/config/facebook-provider-config';
import { GoogleProviderConfig } from '../models/config/google-provider-config';
import { GoogleProvider } from '../providers/google-provider';
import { Provider } from '../models/provider';
import { SocialUser } from '../models/social-user';

@Injectable()
export class SocialLoginService {
    private readonly _providers: { [providerId: string]: OauthProvider } = {};

    private _providerInUse: Provider;

    constructor(@Inject(CONFIG) config: ProviderConfig) {
        this._providers = Object.keys(config).reduce((obj, providerId) => {
            const provider = Provider[providerId.toUpperCase()];
            obj[provider] = this.oauthProviderFactory(provider, config[providerId]);
            return obj;
        }, {});
    }

    login(provider: Provider): Observable<SocialUser> {
        this._providerInUse = provider;
        const oauthProvider = this._providers[provider];
        return oauthProvider ? oauthProvider.login() : EMPTY;
    }

    logout(): Observable<SocialUser> {
        const oauthProvider = this._providers[this._providerInUse];
        return oauthProvider ? oauthProvider.logout() : EMPTY;
    }

    private oauthProviderFactory(
        provider: Provider,
        config: GoogleProviderConfig | FacebookProviderConfig
    ): OauthProvider {
        switch (provider) {
            case Provider.FACEBOOK:
                return new FacebookProvider(config as FacebookProviderConfig);
            case Provider.GOOGLE:
                return new GoogleProvider(config as GoogleProviderConfig);
        }
    }
}
