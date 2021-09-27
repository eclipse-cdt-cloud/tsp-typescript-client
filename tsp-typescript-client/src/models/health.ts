/**
 * Model for a server health status response
 */
export interface HealthStatus {
    /**
     * The server status
     */
    status: 'UP' | 'DOWN';

}
