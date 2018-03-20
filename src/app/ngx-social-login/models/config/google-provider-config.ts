export interface GoogleProviderConfig {

    client_id: string;

    cookie_policy?: string;

    scope?: Array<string>;

    fetch_basic_profile?: boolean;

    hosted_domain?: string;

    openid_realm?: string;

    ux_mode?: string;

    redirect_uri?: string;

}
