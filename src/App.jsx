import React from 'react'

import Game from './game'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.setState({
      game: Game()
    })
  }

  render () {
    return (
      <div>{ JSON.stringify(this.game) }</div>
    )
  }
}
