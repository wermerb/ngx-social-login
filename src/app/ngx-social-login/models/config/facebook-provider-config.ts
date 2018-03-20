export interface FacebookProviderConfig {

    appId: string;

    version?: string;

    cookie?: boolean;

    status?: boolean;

    xfbml?: boolean;

    frictionlessRequests?: boolean;

    hideFlashCallback?: () => void;

}
