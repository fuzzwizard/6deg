// TODO: Fetch polyfill raises warning in dev enviroment (thanks Rollup).
// Find alternate solution or suppress warning.
// import 'whatwg-fetch'
import {raise, selectRandom, selectFirst} from '../util'

/* httpGet
 *
 * ARGUMENTS:
 * url: String, callback: Function
 * RETURN: void
 *
 * Utility method for httpGets. Passes JSON parsed data to `callback`.
 **/

const httpGet = (url, callback) =>
  window.fetch(url)
  .then(response => response.json())
  .then(callback)
  .catch(e => raise(e))

const BASE_URL = 'https://api.spotify.com/v1'
const MARKET = 'US'

/* getRelatedArtists
 *
 * ARGUMENTS:
 * id: String, callback: Function
 * RETURN: void
 *
 * Passes an array of artist objects (all related to the artist of `id`) to the
 * `callback`.
 **/
const getRelatedArtists = (id, callback) =>
  httpGet(`${BASE_URL}/artists/${id}/related-artists`, callback)

/* getRelatedArtists
 *
 * ARGUMENTS:
 * id: String, callback: Function
 * RETURN: void
 *
 * Passes the artist object of `id` to `callback`.
 **/
const getArtistInfo = (id, callback) =>
  httpGet(`${BASE_URL}/artists/${id}`, callback)

/* searchArtist
 *
 * ARGUMENTS:
 * name: String, callback: Function
 * RETURN: void
 *
 * Requests the artist search results of `name` and passes it to the callback.
 **/
const searchArtist = (name, callback) =>
  httpGet(`${BASE_URL}/search?q=${name}&type=artist&market=${MARKET}`, callback)

const DEGREES = 6

/* getNewStartingArtist
 *
 * ARGUMENTS:
 * keyArtistId: String, callback: Function
 * RETURN: void
 *
 * Leaps a new starting artist and passes both it and it's related artists
 * to `callback`.
 *
 * TODO: Add duplicate checks to prevent ping-ponging to already-passed artists.
 **/
export const getNewStartingArtist = (keyArtistId, callback) => {
  let artist = {id: null}

  for (let i = 1; i <= DEGREES + 1; i++) {
    getRelatedArtists(
      artist.id || keyArtistId,
      ({artists: related}) => {
        artist = selectRandom(related)
        if (i === DEGREES + 1) {
          callback(artist, related)
        }
      }
    )
  }
}

/* getNewStartingArtist
 *
 * ARGUMENTS:
 * keyArtistId: String, callback: Function
 * RETURN: void
 *
 * Leaps a new starting artist and passes both it and it's related artists
 * to `callback`.
 *
 * TODO: Add duplicate checks to prevent ping-ponging to already-passed artists.
 **/
export const getNextArtist = (id, callback) => {
  getArtistInfo(id, artist => {
    getRelatedArtists(id, ({artists: related}) => {
      callback(artist, related)
    })
  })
}

/* getNewKeyArtist
 *
 * ARGUMENTS:
 * name: String, callback: Function
 * RETURN: void
 *
 * Contact's Spotify's artist search api with query `name` and passes the first
 * object of the return to the callback.
 **/
export const getNewKeyArtist = (name, callback) => {
  searchArtist(name, results => {
    callback(selectFirst(results.artists.items))
  })
}
