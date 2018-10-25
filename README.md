# [POC] React InstantSearch - TagsBox Widget for React

**Disclaimer: this component is published as an experiment. As such, it is not part of the official InstantSearch.js library and might not be suited for production use.**

## How to install?
`yarn add instansearch-tagsbox-react`

## How to use?

First, you'll need to render the `<Tags />` component inside an `<InstantSearch />` one.

Also, some props are required to make the component works properly:
- **tagSelectedComponent**: describe how a selected tag should be displayed, take a `hit` as parameter,
- **tagSuggestionComponent**: describe how tags suggestions should be displayed, take a `hit` as parameter,
- **onUpdate**: call on every addition / removal of a tag, has two parameters, `actualTags` and `previousTags`.

```jsx harmony
export const TagSelectedComponent = ({ hit }) => (
    <Fragment>
        {hit.lastname}
    </Fragment>
);

export const TagSuggestionComponent = ({ hit }) => (
    <Fragment>
        {`${hit.firstname} ${hit.lastname}`}
    </Fragment>
);


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
