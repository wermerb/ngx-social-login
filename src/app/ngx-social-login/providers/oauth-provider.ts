import {Observable} from 'rxjs/Observable';
import {Provider, SocialUser} from '../models';

export abstract class OauthProvider {

    private readonly ID_PREFIX = 'social-login__';

    constructor(provider: Provider, src: string, onload: () => void, async = true) {
        const id = this.ID_PREFIX + provider;

        if (document.getElementById(id)) {
            return;
        }

        const script = document.createElement('script');
        script.id = id;
        script.async = async;
        script.src = src;
        script.onload = onload;
        script.defer = true;
        document.head.appendChild(script);
    }

    abstract login(): Observable<SocialUser>;

    abstract logout(): Observable<any>;

}
