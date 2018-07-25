import {GoogleProviderConfig} from './google-provider-config';
import {FacebookProviderConfig} from './facebook-provider-config';

export interface ProviderConfig {

    google?: GoogleProviderConfig;

    facebook?: FacebookProviderConfig;

}
