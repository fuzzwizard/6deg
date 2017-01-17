import React from 'react'

export default ({number}) => (
  <div className='score-counter'> score: { number < 0 ? 0 : number } </div>
)
