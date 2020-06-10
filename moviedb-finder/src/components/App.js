import React, { Component } from 'react';
import Nav from './Nav'
import SearchArea from './SearchArea'

const apikey = process.env.REACT_APP_API

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${this.state.searchTerm}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({ movies: [...data.results]})
    })
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <SearchArea
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;
