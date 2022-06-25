/**
 * Returns true if path a matches path b
 *
 * @remarks
 * 2 paths match if every element in path a is equal to the corresponding element in path b
 * ignoring elements at the end of path b that are not in path a
 *
 * Basically, this function returns true if b starts with the elements of a.
 *
 * If path a is an empty array, true is returned.
 *
 * @example
 * ```js
 * patchMatches(['a', 'b'], ['a', 'b', 'c']) // true
 * patchMatches(['a', 'b'], ['a', 'b', 'c', 'd']) // true
 * patchMatches(['a', 'b', 'c'], ['a', 'b']) // false
 * patchMatches(['a', 'b', 'c'], ['d', 'e', 'f']) // false
 * ```
 *
 * @param a - path a
 * @param b - path b
 *
 * @public
 */
export default function pathMatches(a: string[], b: string[]): boolean {
  return a.every((v, i) => b[i] === v)
}
