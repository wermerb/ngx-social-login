import {InjectionToken} from '@angular/core';
import {ProviderConfig} from './config/provider-config';

export const CONFIG: InjectionToken<ProviderConfig> = new InjectionToken<ProviderConfig>('providers configuration');
