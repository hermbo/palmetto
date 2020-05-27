import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons'

class Results extends Component {

  // Lift saved result state back to App
  liftSavedResult = (e, result) => {
    e.preventDefault();
    this.props.liftSavedResult(result);
  }

  render() {
    const { results, saved } = this.props;

    return (
      <div className="Results">
        {results.map(result => {
          return (
            <div className="Results-result" key={result.id}>
              <div className="Results-image">
                <img src={result.webformatURL} alt={result.user} />
                <a href={result.id}
                  className={saved.some(save => save.id === result.id) ? "saved" : ""}
                  onClick={e => this.liftSavedResult(e, result)}>
                  {saved.some(save => save.id === result.id) ? "Saved" : "Save"}
                </a>
              </div>
              <div className="Results-meta">
                <div className="Results-tags">
                  {result.tags.split(",").map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <div className="Results-social">
                  <span>{result.likes} <FontAwesomeIcon className="icon" icon={faThumbsUp} /></span>
                  <span>{result.favorites} <FontAwesomeIcon className="icon" icon={faStar} /></span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Results;
