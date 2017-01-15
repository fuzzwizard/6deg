/* eslint no-unused-vars: 0 */
import {
  getRelatedArtists
} from '../util/spotify'

const MUNGO_JERRY_ID = '2mbvqMGpwLsakeH45p1Jrb'

// TODO: Get a proper shuffle algorithim in here. Fisher-Yates, prolly.
const selectRandom = array =>
  array[Math.floor(Math.random() * array.length)]

/*
3 -> fn(2)
2 -> fn(1)
1 -> fn(0)
0 -> res
*/

const iterateN = (n, fn, result) =>
  n > 0 ? iterateN(n - 1, fn, fn(result)) : result

const newStartingArtist = () => null

// Returns a new game
export default () => ({
  score: 0,
  startingArtist: newStartingArtist()
})
