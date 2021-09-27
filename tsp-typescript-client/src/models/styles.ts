/**
 * Output element style object for one style key. It supports style
 * inheritance. To avoid creating new styles the element style can have a parent
 * style and will have all the same style properties values as the parent and
 * can add or override style properties.
 */
export interface OutputElementStyle {
    /**
     * Parent style key
     */
    parentKey: string;

    /**
     * Style values to override or define properties
     */
    values: { [key: string]: any };
}

/**
 * Style model that will be returned by the server
 */
export interface OutputStyleModel {
    /**
     * Styles map where the style key is associated to a specific style
     */
    styles: { [key: string]: OutputElementStyle };
}
