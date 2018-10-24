import React, { Fragment } from 'react';
import { connectAutoComplete } from 'react-instantsearch-dom';

import TagsBoxContainer from './TagsBoxContainer';
import SuggestedTagsContainer from './SuggestedTagsContainer';

import './Tags.css';

class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            hoveredTagIndex: -1
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentRefinement !== prevProps.currentRefinement) {
            this.setState({ hoveredTagIndex: -1 });
        }
    }

    addTag = hit => {
        const { tags } = this.state;
        const { onUpdate } = this.props;

        this.setState({ tags: [ ...tags,  hit ]}, () => {
            onUpdate(this.state.tags, tags);
        });
    };

    removeTag = hitObjectID => {
        const { tags } = this.state;
        const { onUpdate } = this.props;

        const updatedTags = [ ...tags ];
        const indexToRemove = updatedTags.findIndex(tag => tag.objectID === hitObjectID);
        updatedTags.splice(indexToRemove, 1);

        this.setState({ tags: updatedTags }, () => {
            onUpdate(this.state.tags, tags);
        })
    };

    updateHoveredTagIndex = operation => {
        const { hits } = this.props;
        const { hoveredTagIndex } = this.state;

        if (operation > 0 && hoveredTagIndex < hits.length - 1) {
            this.setState({ hoveredTagIndex: hoveredTagIndex + operation });
        } else if (operation < 0 && hoveredTagIndex > 0) {
            this.setState({ hoveredTagIndex: hoveredTagIndex + operation });
        }
    };

    render() {
        const { tags, hoveredTagIndex } = this.state;
        const { tagSelectedComponent, tagSuggestionComponent, translations } = this.props;

        return (
            <Fragment>
                <TagsBoxContainer
                    tags={tags}
                    hoveredTagIndex={hoveredTagIndex}
                    onAddTag={this.addTag}
                    onRemoveTag={this.removeTag}
                    onUpdateHoveredTag={this.updateHoveredTagIndex}
                    tagSelectedComponent={tagSelectedComponent}
                    translations={translations} />

                <SuggestedTagsContainer
                    tags={tags}
                    hoveredTagIndex={hoveredTagIndex}
                    tagSuggestionComponent={tagSuggestionComponent}
                    onAddTag={this.addTag}
                    translations={translations} />

            </Fragment>
        )
    }
}

export default connectAutoComplete(Tags);