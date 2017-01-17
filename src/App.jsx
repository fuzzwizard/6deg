import React from 'react'

import ArtistPanel from './components/ArtistPanel.jsx'
import Score from './components/Score.jsx'
import Header from './components/Header.jsx'
import Modal from './components/Modal.jsx'

import {
  getNewStartingArtist,
  getNextArtist,
  getNewKeyArtist
} from './spotify'

export default class App extends React.Component {
  // Set initial state upon mount
  componentWillMount () {
    this.setState({
      artistQueue: [],
      keyArtistId: null,
      showModal: true
    })
  }

  // Initializes a new game state with a new key artist and hides the modal.
  startGame () {
    getNewStartingArtist(
      this.state.keyArtistId,
      (artist, related) => {
        this.setState({showModal: false})
        this.addArtistToQueue({ artist, related })
      }
    )
  }

  // Clears the current gamestate.
  endGame () {
    this.setState({
      artistQueue: [],
      keyArtistId: null,
      showModal: true
    })
  }

  // Adds an artist to the display queue.
  addArtistToQueue ({artist, related}) {
    this.setState({
      artistQueue: this.state.artistQueue.concat({artist, related})
    })
  }

  // Passed to the new game modal to starting the game.
  newKeyArtistHandler (name) {
    getNewKeyArtist(name, artist => {
      this.setState({ keyArtistId: artist.id })
      this.startGame()
    })
  }

  // Determines if the player has won. If so, ends the game. If not, appends
  // another artist to the queue.
  nextArtistHandler (id) {
    if (id === this.state.keyArtistId) {
      this.endGame()
    } else {
      getNextArtist(id, (artist, related) => {
        this.addArtistToQueue({ artist, related })
      })
    }
  }

  render () {
    const modal = this.state.showModal
      ? <Modal getNewKeyArtist={this.newKeyArtistHandler.bind(this)} />
      : null

    const artists =
      this.state.artistQueue
      .reverse()
      .map(({artist, related}) => (
        <ArtistPanel
          key={artist.id}
          getNextArtist={this.nextArtistHandler.bind(this)}
          artist={artist}
          related={related}
        />
      ))

    return (
      <div>
        <Header />
        <Score number={this.state.artistQueue.length - 1} />
        {modal}
        {artists}
      </div>
    )
  }
}
