export interface FacebookProviderConfig {

    initOptions: {
        appId: string;

        version?: string;

        cookie?: boolean;

        status?: boolean;

        xfbml?: boolean;

        frictionlessRequests?: boolean;

        hideFlashCallback?: () => void;
    };

    loginOptions?: {
        auth_type?: string;

        scope?: string;

        return_scopes?: boolean;

        enable_profile_selector?: boolean;

        profile_selector_ids?: string;
    };

}
