/**
 * Normalize a word for easier comparison.
 *
 * Always normalizes smart apostrophes (`’`) to straight apostrophes (`'`) and
 * lowercases alphabetical characters (`[A-Z]`).
 *
 * @param {Array<Nodes> | Nodes | string} value
 *   Word.
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Normalized word.
 */
export function normalize(value: Array<Nodes> | Nodes | string, options?: Options | null | undefined): string;
export type Nodes = import('nlcst').Nodes;
/**
 * Configuration.
 */
export type Options = {
    /**
     * Do not strip hyphens (`-`) (default: `false`).
     *
     * The default is to remove the hyphen-minus character.
     */
    allowDashes?: boolean | null | undefined;
    /**
     * Do not strip apostrophes (`'`) (default: `false`).
     *
     * The default is to remove apostrophes.
     */
    allowApostrophes?: boolean | null | undefined;
};
