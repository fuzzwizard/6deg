import React from 'react'

import ArtistEntry from './ArtistEntry'

export default ({artist, related}) => (
  <section>
    { <ArtistEntry onClick={() => null} /> }
    <ul>
      {
        related.map(artist =>
          (<ArtistEntry
            className='small'
            onClick={() => console.log('Clicked!')}
          />)
        )
      }
    </ul>
  </section>
)
