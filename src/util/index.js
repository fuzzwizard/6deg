export const raise = e => { throw e }

// TODO: Get a proper shuffle algorithim in here. Fisher-Yates, prolly.
export const selectRandom = array =>
  array[Math.floor(Math.random() * array.length)]

export const selectFirst = a =>
  Array.isArray(a) ? a[0] || null : null

export const selectLast = a =>
  Array.isArray(a) ? a[a.length - 1] || null : null

export const iterateN = (n, fn, result) =>
  n > 0 ? iterateN(n - 1, fn, fn(result)) : result

export const prop = field => obj => obj ? obj[field] : null

export const sortByPropAscending = p => (a, b) =>
  (prop(p)(a) || -Infinity) - (prop(p)(b) || -Infinity)

export const sortByPropDescending = p => (a, b) =>
  (prop(p)(b) || Infinity) - (prop(p)(a) || Infinity)
