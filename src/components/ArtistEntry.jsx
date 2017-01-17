import React from 'react'

import {selectFirst, selectLast, prop, sortByPropAscending} from '../util'

// Default for `imgs` here ensures we don't get a type error on the `sort` call.
// Might need a more stable solution in time.
// TODO: Also consider DRYing this code out.
const getSmallestImgURL = (imgs = []) =>
  prop('url')(selectFirst(imgs.sort(sortByPropAscending('height'))))

const getLargestImgURL = (imgs = []) =>
  prop('url')(selectLast(imgs.sort(sortByPropAscending('height'))))

export default ({artist, getNextArtist, large = false}) => {
  if (!artist) return (<i />)

  return (
    <article className='artist-container'>
      <img
        className='artist-entry-photo'
        src={large
          ? getLargestImgURL(artist.images)
          : getSmallestImgURL(artist.images)}
        alt={`${artist.name} artist photo.`}
      />

      <p
        className='artist-entry-text'
        onClick={() => getNextArtist(artist.id)}>
        { artist.name }
      </p>
    </article>
  )
}
