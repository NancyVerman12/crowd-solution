// TypeScript interfaces for API responses

export interface OccupancyBucket {
    utc: number;
    local: string;
    avg: number;
}

export interface OccupancyResponse {
    siteId: string;
    fromUtc: string;
    toUtc: string;
    timezone: string;
    buckets: OccupancyBucket[];
}

export interface FootfallResponse {
    siteId: string;
    fromUtc: string;
    toUtc: string;
    footfall: number;
}

export interface DwellResponse {
    siteId: string;
    fromUtc: string;
    toUtc: string;
    avgDwellMinutes: number;
    dwellRecords: number;
}

export interface DemographicsBucket {
    utc: number;
    local: string;
    male: number;
    female: number;
}

export interface DemographicsResponse {
    siteId: string;
    fromUtc: string;
    toUtc: string;
    timezone: string;
    buckets: DemographicsBucket[];
}

export interface EntryExitRecord {
    personId: string;
    personName: string;
    gender: string;
    zoneId: string;
    zoneName: string;
    severity: string;
    entryUtc: number;
    entryLocal: string;
    exitUtc: number | null;
    exitLocal: string | null;
    dwellMinutes: number | null;
    snapshot?: string; // Base64 or URL
}

export interface EntryExitResponse {
    siteId: string;
    fromUtc: string;
    toUtc: string;
    pageSize: number;
    pageNumber: number;
    totalRecords: number;
    totalPages: number;
    records: EntryExitRecord[];
}

export interface LoginResponse {
    token: string;
}

export interface Zone {
    zoneId: string;
    name: string;
    securityLevel: string;
}

export interface Site {
    siteId: string;
    name: string;
    city: string;
    country: string;
    timezone: string;
    zones: Zone[];
}

export type SitesResponse = Site[];

export interface ApiError {
    message: string;
    status?: number;
}
