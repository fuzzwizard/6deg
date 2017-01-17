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

// const MUNGO_JERRY_ID = '2mbvqMGpwLsakeH45p1Jrb'

export default class App extends React.Component {
  componentWillMount () {
    this.setState({
      artistQueue: [],
      keyArtistId: null,
      showModal: true
    })
  }

  newKeyArtistHandler (name) {
    getNewKeyArtist(name, artist => {
      this.setState({ keyArtistId: artist.id })
      this.startGame()
    })
  }

  startGame () {
    getNewStartingArtist(
      this.state.keyArtistId,
      (artist, related) => {
        this.setState({showModal: false})
        this.addArtistToQueue({ artist, related })
      }
    )
  }

  nextArtistHandler (id) {
    console.log(id, this.keyArtistId)

    if (id === this.state.keyArtistId) {
      this.endGame()
    } else {
      getNextArtist(id, (artist, related) => {
        this.addArtistToQueue({ artist, related })
      })
    }
  }

  endGame () {
    this.setState({
      artistQueue: [],
      keyArtistId: null,
      showModal: true
    })
  }

  addArtistToQueue ({artist, related}) {
    this.setState({
      artistQueue: this.state.artistQueue.concat({artist, related})
    })
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
