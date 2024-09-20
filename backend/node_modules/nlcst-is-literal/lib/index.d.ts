/**
 * Check if the child in `parent` at `index` is enclosed by matching
 * delimiters.
 *
 * For example, `foo` is literal in the following samples:
 *
 * *   `Foo - is meant as a literal.`
 * *   `Meant as a literal is - foo.`
 * *   `The word “foo” is meant as a literal.`
 *
 * @template {Parents} ParentType
 *   Parent node.
 * @param {ParentType} parent
 *   Parent node.
 * @param {ParentType['children'][number] | number} index
 *   Child node of parent or index of child in parent.
 * @returns {boolean}
 *   Whether the child is a literal.
 */
export function isLiteral<ParentType extends import("nlcst").Parents>(parent: ParentType, index: number | ParentType["children"][number]): boolean;
export type Nodes = import('nlcst').Nodes;
export type Parents = import('nlcst').Parents;
export type RootContent = import('nlcst').RootContent;
