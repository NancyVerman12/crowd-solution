import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { AuthService } from './auth';
import type {
    OccupancyResponse,
    FootfallResponse,
    DwellResponse,
    DemographicsResponse,
    EntryExitResponse,
    LoginResponse,
    SitesResponse,
} from '../types/api';

// API Client for making HTTP requests
class ApiClient {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
    }

    // Generic fetch wrapper with auth headers
    private async fetch<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = AuthService.getToken();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Unauthorized - logout user
                AuthService.logout();
            }
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    // POST request
    async post<T>(endpoint: string, data: any): Promise<T> {
        return this.fetch<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // GET request
    async get<T>(endpoint: string): Promise<T> {
        return this.fetch<T>(endpoint, {
            method: 'GET',
        });
    }
}

const apiClient = new ApiClient();

// Analytics API Service
export const analyticsApi = {
    // Login
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            { email, password }
        );
        return response;
    },

    // Get available sites
    async getSites(): Promise<SitesResponse> {
        return apiClient.get<SitesResponse>(API_ENDPOINTS.SITES.LIST);
    },

    // Get occupancy data
    async getOccupancy(
        siteId: string,
        fromUtc: string,
        toUtc: string
    ): Promise<OccupancyResponse> {
        return apiClient.post<OccupancyResponse>(
            API_ENDPOINTS.ANALYTICS.OCCUPANCY,
            { siteId, fromUtc, toUtc }
        );
    },

    // Get footfall data
    async getFootfall(
        siteId: string,
        fromUtc: string,
        toUtc: string
    ): Promise<FootfallResponse> {
        return apiClient.post<FootfallResponse>(
            API_ENDPOINTS.ANALYTICS.FOOTFALL,
            { siteId, fromUtc, toUtc }
        );
    },

    // Get dwell time data
    async getDwell(
        siteId: string,
        fromUtc: string,
        toUtc: string
    ): Promise<DwellResponse> {
        return apiClient.post<DwellResponse>(
            API_ENDPOINTS.ANALYTICS.DWELL,
            { siteId, fromUtc, toUtc }
        );
    },

    // Get demographics data
    async getDemographics(
        siteId: string,
        fromUtc: string,
        toUtc: string
    ): Promise<DemographicsResponse> {
        return apiClient.post<DemographicsResponse>(
            API_ENDPOINTS.ANALYTICS.DEMOGRAPHICS,
            { siteId, fromUtc, toUtc }
        );
    },

    // Get entry/exit records
    async getEntryExit(
        siteId: string,
        fromUtc: string,
        toUtc: string,
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<EntryExitResponse> {
        return apiClient.post<EntryExitResponse>(
            API_ENDPOINTS.ANALYTICS.ENTRY_EXIT,
            { siteId, fromUtc, toUtc, pageNumber, pageSize }
        );
    },
};

// Helper function to get today's UTC timestamps
export function getTodayTimestamps(): { fromUtc: string; toUtc: string } {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    return {
        fromUtc: startOfDay.getTime().toString(),
        toUtc: endOfDay.getTime().toString(),
    };
}

// Get yesterday's start and end timestamps
export function getYesterdayTimestamps(): { fromUtc: number; toUtc: number } {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const startOfYesterday = new Date(yesterday);
    startOfYesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    return {
        fromUtc: startOfYesterday.getTime(),
        toUtc: endOfYesterday.getTime()
    };
}

// Format minutes to readable time
export function formatDwellTime(minutes: number): string {
    const totalMinutes = Math.floor(minutes);
    const secs = Math.floor((minutes % 1) * 60);

    // Always format as "XXmin YYsec" to match Figma design
    return `${totalMinutes.toString().padStart(2, '0')}min ${secs.toString().padStart(2, '0')}sec`;
}
