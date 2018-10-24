import React from 'react';
import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';

class SuggestedTagsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false
        };

        this.resultsRefs = { };
    }

    componentDidUpdate(prevProps) {
        const { currentRefinement, tags, hoveredTagIndex } = this.props;

        if (currentRefinement !== prevProps.currentRefinement) {
            this.setState({ isOpened: currentRefinement.trim() !== '' });
        }

        if (Object.keys(tags).length !== Object.keys(prevProps.tags).length) {
            this.setState({ isOpened: false });
        }

        if (hoveredTagIndex !== prevProps.hoveredTagIndex) {
            if (typeof this.resultsRefs[hoveredTagIndex] !== 'undefined') {
                this.resultsRefs[hoveredTagIndex].scrollIntoView(false);
            }
        }
    }

    render() {
        const { isOpened } = this.state;
        const { hits, onAddTag, hoveredTagIndex, tagSuggestionComponent: TagSuggestionComponent } = this.props;

        if (!isOpened) {
            return false;
        }

        return (
            <div className="ais-SuggestedTagsBox">
                <ul className="ais-SuggestedTagsBox-list">
                    {hits.map((hit, hitIdx) =>
                        <li
                            key={hit.objectID}
                            ref={instance => this.resultsRefs[hitIdx] = instance}
                            className={`ais-SuggestedTagsBox-tag ${hoveredTagIndex === hitIdx ? 'hovered' : ''}`}
                            onClick={() => onAddTag(hit)}
                        >
                            <TagSuggestionComponent hit={hit} />
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

SuggestedTagsContainer.propTypes = {
    tags: PropTypes.array.isRequired,
    onAddTag: PropTypes.func.isRequired,
    hoveredTagIndex: PropTypes.number.isRequired,
    tagSuggestionComponent: PropTypes.func.isRequired
};

export default connectAutoComplete(SuggestedTagsContainer);