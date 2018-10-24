# InstantSearch.js - TagsBox Widget for React

## How to use?

```jsx harmony
<InstantSearch
  appId="XXX"
  apiKey="XXX"
  indexName="XXX">
  <Tags
        tagSelectedComponent={TagSelectedComponent}
        tagSuggestionComponent={TagSuggestionComponent}
        onUpdate={this.onTagsUpdate}
        translations={{ placeholder: "A placeholder…" }}
    />
</InstantSearch>
```