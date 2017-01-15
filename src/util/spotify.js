/* eslint no-undef: 0 */
import 'whatwg-fetch'

const fetchJSON = (url) =>
  fetch(url, {json: true})

const getRelatedArtists = (id, callback) =>
  fetchJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`)
  .then(callback)

'https://api.spotify.com/v1/artists/{id}'                 // Get artist
'https://api.spotify.com/v1/artists/{id}/related-artists' // Get related artists

export {
//   getArtistInfo,
  getRelatedArtists
}
