// import 'whatwg-fetch'
import {raise, selectRandom, selectFirst} from '../util'

const httpGet = (url, callback) =>
  window.fetch(url)
  .then(response => response.json())
  .then(callback)
  .catch(e => raise(e))

const BASE_URL = 'https://api.spotify.com/v1'

const getRelatedArtists = (id, callback) =>
  httpGet(`${BASE_URL}/artists/${id}/related-artists`, callback)

const getArtistInfo = (id, callback) =>
  httpGet(`${BASE_URL}/artists/${id}`, callback)

const searchArtist = (name, callback) =>
  httpGet(`${BASE_URL}/search?q=${name}&type=artist&market=US`, callback)

const DEGREES = 6

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

export const getNextArtist = (id, callback) => {
  getArtistInfo(id, artist => {
    getRelatedArtists(id, ({artists: related}) => {
      callback(artist, related)
    })
  })
}

export const getNewKeyArtist = (name, callback) => {
  searchArtist(name, results => {
    callback(selectFirst(results.artists.items))
  })
}
