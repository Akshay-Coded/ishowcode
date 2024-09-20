/**
 * Search for phrases in a tree.
 *
 * Each phrase is a space-separated list of words, where each word will be
 * normalized to remove casing, apostrophes, and dashes.
 * Spaces in a pattern mean one or more whitespace nodes in the tree.
 * Instead of a word with letters, it’s also possible to use a wildcard
 * symbol (`*`, an asterisk) which will match any word in a pattern
 * (`alpha * charlie`).
 *
 * @param {Nodes} tree
 *   Tree to search.
 * @param {Array<string>} phrases
 *   Phrases to search for.
 * @param {Handler} handler
 *   Handle a match
 * @param {Options} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export function search(tree: Nodes, phrases: Array<string>, handler: Handler, options?: Options | undefined): undefined;
export type Nodes = import('nlcst').Nodes;
export type Root = import('nlcst').Root;
export type Sentence = import('nlcst').Sentence;
export type SentenceContent = import('nlcst').SentenceContent;
export type NormalizeOptions = import('nlcst-normalize').Options;
/**
 * Handle a match.
 */
export type Handler = (nodes: Array<SentenceContent>, index: number, parent: Root | Sentence, phrase: string) => undefined | void;
/**
 * Configuration (optional).
 */
export type Options = NormalizeOptions & OptionsExtraFields;
/**
 * Extra fields.
 */
export type OptionsExtraFields = {
    /**
     * Include literal phrases (default: `false`).
     */
    allowLiterals?: boolean | null | undefined;
};
