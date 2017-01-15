import React from 'react'

export default ({name, imageUrl = null, onClick = null}) => (
  <article>
    <img
      src={imageUrl}
      alt={`${name} artist photo.`} />
    <h1
      onClick={onClick}>
      { name }
    </h1>
  </article>
)
