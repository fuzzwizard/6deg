import React from 'react'

import ArtistEntry from './ArtistEntry.jsx'

export default ({artist, related, getNextArtist}) => (
  <section className='artist-panel'>
    <main className='main-artist-container'>
      <ArtistEntry artist={artist} large />
    </main>
    <ul className='related-artists'>
      <header>Related artists</header>
      {
        related.map((artist, index) => (
          <li key={index}>
            <ArtistEntry
              className='related-artist-entry'
              key={artist.id}
              artist={artist}
              getNextArtist={getNextArtist}
            />
          </li>
        ))
      }
    </ul>
  </section>
)
