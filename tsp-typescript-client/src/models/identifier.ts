/**
 * Model of the identifier
 */
export interface Identifier {
    /**
     * Version in the format Major.Minor.Micro
     */
    version: string;

    /**
     * Build time or qualifier of the server version, if available
     */
    buildTime: string;

    /**
     * Operating system name
     */
    os: string;

    /**
     * Architecture of the operating system
     */
    osArch: string;

    /**
     * Operating system version
     */
    osVersion: string;

    /**
     * Number of CPUs available
     */
    cpuCount: string;

    /**
     * Maximum memory available to the JVM in bytes
     */
    maxMemory: string;

    /**
     * Name of the launcher used, if available
     */
    launcherName: string;

    /**
     * Product identifier
     */
    productId: string;
}
