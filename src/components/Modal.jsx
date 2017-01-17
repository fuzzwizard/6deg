import React from 'react'

export default class NameModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.getNewKeyArtist(this.state.value)
  }

  render () {
    return (
      <main className='name-modal'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='artist-name'>
            Please select an artist:
            <input
              type='text'
              value={this.state.value}
              name='artist-name'
              onChange={this.handleChange}
            />
          </label>
          <input type='submit' value='Ok' />
        </form>
      </main>
    )
  }
}
