import React, { Component } from 'react';
import Results from './Results.js';

const categories = [
  "Fashion",
  "Nature",
  "Backgrounds",
  "Science",
  "Education",
  "People",
  "Feelings",
  "Religion",
  "Places",
  "Animals",
  "Industry",
  "Computer",
  "Food",
  "Sports",
  "Transportation",
  "Travel",
  "Buildings",
  "Business",
  "Music"
];

class Search extends Component {

  state = {
    query: '',
    category: '',
    results: [],
    loading: false
  }

  searchPixabay = (e) => {
    e.preventDefault();
    if (!this.state.query)
      return;

    const key = "13136421-266c28a6d61717bc2e4e6a83e";
    this.setState({loading: true})
    fetch("https://pixabay.com/api/?key=" + key + "&q=" + this.state.query + "&image_type=photo&per_page=10&category=" + this.state.category )
      .then(data => data.json())
      .then(data => {
        data.totalHits ? this.setState({results: data.hits}) : this.setState({results: false})
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  setQuery = (e) => {
    this.setState({query: e.target.value.replace(' ', '+')})
  }

  setCategory = (e) => {
    this.setState({category: e.target.value})
  }

  render() {

    const { saved, liftSavedResult } = this.props;

    return (
      <>
        <form name="search" action="">
          <label htmlFor="keyword">Enter a keyword...</label>
          <input id="keyword" name="keyword" type="search" placeholder="Keyword..." required onKeyUp={e => this.setQuery(e)} />
          <label htmlFor="category">Choose a category</label>
          <select id="category" name="category" defaultValue="" onChange={e => this.setCategory(e)}>
            <option value="">Category...</option>
            {categories.map(category => <option key={category.toLowerCase()} value={category.toLowerCase()}>{category}</option>)}
          </select>
          <button onClick={e => this.searchPixabay(e)}>Search</button>
        </form>

        {!this.state.results === false
          ? this.state.results ? <Results results={this.state.results} liftSavedResult={liftSavedResult} saved={saved} /> : ''
          : 'No results, please try another keyword or category.'
        }
      </>
    );
  }
}

export default Search;
