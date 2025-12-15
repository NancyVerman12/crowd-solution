// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://hiring-dev.internal.kloudspot.com',
    DEFAULT_SITE_ID: '8bd0d580-fdac-44a4-a6e4-367253099c4e',
    TIMEOUT: 10000, // 10 seconds
} as const;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
    },
    SITES: {
        LIST: '/api/sites',
    },
    ANALYTICS: {
        OCCUPANCY: '/api/analytics/occupancy',
        FOOTFALL: '/api/analytics/footfall',
        DWELL: '/api/analytics/dwell',
        DEMOGRAPHICS: '/api/analytics/demographics',
        ENTRY_EXIT: '/api/analytics/entry-exit',
    },
} as const;

// Token storage keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'crowd_auth_token',
    USER_EMAIL: 'crowd_user_email',
    SELECTED_SITE_ID: 'crowd_selected_site_id',
    SELECTED_SITE_NAME: 'crowd_selected_site_name',
} as const;
