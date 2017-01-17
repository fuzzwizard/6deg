export const raise = e => { throw e }

/* selectRandom
 *
 * Selects a random item from `array` and returns it.
 *
 * TODO: Get a proper shuffle algorithim in here. Fisher-Yates, prolly.
 **/
export const selectRandom = array =>
  array[Math.floor(Math.random() * array.length)]


/* selectFirst
 *
 * Selects a the first item from `array` and returns it, with type protection
 * and nullability.
 **/
export const selectFirst = array =>
  Array.isArray(array) ? array[0] || null : null

/* selectLast
 *
 * Selects a the last item from `array` and returns it, with type protection
 * and nullability.
 **/
export const selectLast = array =>
  Array.isArray(array) ? array[array.length - 1] || null : null

/* prop
 *
 * Returns a function which safely extracts `field` from `obj`.
 **/
export const prop = field => obj => obj ? obj[field] : null

/* sortByPropAscending & sortByPropDescending
 *
 * Returns a function for Array.sort to use, which sorts objects in said array
 * by the provided property.
 **/
export const sortByPropAscending = p => (a, b) =>
  (prop(p)(a) || -Infinity) - (prop(p)(b) || -Infinity)

export const sortByPropDescending = p => (a, b) =>
  (prop(p)(b) || Infinity) - (prop(p)(a) || Infinity)
