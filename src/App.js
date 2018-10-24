import React, { Component, Fragment } from 'react';
import { InstantSearch, Index, Highlight } from 'react-instantsearch-dom';

import Tags from './lib/Tags';

import './app.css';

export const TagSelectedComponent = ({ hit }) => (
    <Fragment>
        <code>{hit.iata_code}</code>
    </Fragment>
);

export const TagSuggestionComponent = ({ hit }) => (
    <Fragment>
        <Highlight attribute="name" hit={hit} /> <small><code><Highlight attribute="iata_code" hit={hit} /></code></small><br />
        <small><Highlight attribute="city" hit={hit} />, <Highlight attribute="country" hit={hit} /></small>
    </Fragment>
);

class App extends Component {
    onTagsUpdate = (actualTags, previousTags) => {
        console.log('Tags updated', actualTags);
    };

  render() {
    return (
      <div id="app">
          <h2>InstantSearch.js – TagsBox for React</h2>
          <InstantSearch
              appId="6UF5OXUKTD"
              apiKey="0c5c48f199ef2a73d0e97e6427449d03"
              indexName="airports">
              <Index indexName="airports">
                  <Tags
                      tagSelectedComponent={TagSelectedComponent}
                      tagSuggestionComponent={TagSuggestionComponent}
                      onUpdate={this.onTagsUpdate}
                      translations={{ placeholder: "City, Airport IATA…" }}
                  />
              </Index>
          </InstantSearch>
      </div>
    );
  }
}

export default App;
