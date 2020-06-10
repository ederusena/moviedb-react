import React, { Component } from 'react';
import '../App.css';
import Nav from './Nav'
import SearchBox from './SearchBox'
import MovieList from './MovieList'
import Pagination from './Pagination'
import MovieInfo from './MovieInfo';

const apiKey = process.env.REACT_APP_API
class App extends Component {
  constructor(){
    super()
    this.state = {
      movies: [],
      totalResults: 0,
      searchTerm: '',
      currentPage: 1,
      currentMovie: null
    }
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  logData = () => {
    console.log(process.env.REACT_APP_API);
  }

  handleSubmit = (e) => { 
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.searchTerm}&language=en-US&page=${this.state.currentPage}`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results], totalResults: data.total_results})
    })
    
    e.preventDefault()
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.searchTerm}&language=en-US&page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results], totalResults: data.total_results, currentPage: pageNumber})
    })
  }

  viewMovieInfo = (id) => {
    let filteredMovie;
    this.state.movies.forEach((movie, i) => {
      if(movie.id == id) {
        filteredMovie = movie
      }
    }) 

    this.setState({ currentMovie: filteredMovie })  
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null })
  }

  render() {
    let numberPages = Math.floor(this.state.totalResults / 20);
    return (
        <div>
          <Nav />
          {this.state.currentMovie == null ? <div><SearchBox handleSubmit={this.handleSubmit} handleChange={this.handleChange}/><MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/></div> : <MovieInfo closeMovieInfo={this.closeMovieInfo} currentMovie={this.state.currentMovie} />}
            {this.state.totalResults > 20 && this.state.currentMovie == null ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/> : ''}
        </div>
    );
  }
}

export default App;