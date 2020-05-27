import React, { Component } from 'react';
import Search from './Search.js';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  state = {
    saved: []
  }

  setSavedResult = (result) => {
    // Store the saved result
    if (!this.state.saved.includes(result))
      this.setState(prevState => ({
        saved: [...prevState.saved, result]
      }))
  }

  render() {
    return (
      <section className="Search">
        <div className="col-6">
          <Search
            saved={this.state.saved}
            liftSavedResult={this.setSavedResult}
          />
        </div>

        <div className="col-4">
          <h3>Saved</h3>
          <ul className="Search-saved">
            {this.state.saved.map(result => {
              return (
                <li key={result.id}>
                  <a href={result.pageURL}>#{result.id}
                    <FontAwesomeIcon className="icon" icon={faExternalLinkAlt} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    );
  }

}

export default App;
