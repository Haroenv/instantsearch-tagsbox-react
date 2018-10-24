import React from 'react';
import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';

class TagsBoxContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        };

        this.inputRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { refine, tags, hits, onUpdateHoveredTag } = this.props;
        const { inputValue } = this.state;

        if (inputValue !== prevState.inputValue) {
            refine(inputValue);
        }

        if (hits.length !== prevProps.hits.length && hits.length === 1) {
            onUpdateHoveredTag(1);
        }

        if (tags.length !== prevProps.tags.length) {
            this.setState({ inputValue: '' }, this.inputRef.current.focus());
        }
    }

    onInputValueChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    catchSpecialKeys = e => {
        const { inputValue } = this.state;
        const { hits, tags, hoveredTagIndex, onAddTag, onRemoveTag, onUpdateHoveredTag } = this.props;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            onUpdateHoveredTag(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            onUpdateHoveredTag(-1);
        } else if (e.key === 'Enter' && hoveredTagIndex !== -1) {
            e.preventDefault();
            onAddTag(hits[hoveredTagIndex]);
        } else if (e.key === 'Backspace' && inputValue.trim() === '' && tags.length > 0) {
            onRemoveTag(tags[tags.length - 1].objectID);
        }
    };

    render() {
        const { inputValue } = this.state;
        const { tags, currentRefinement, onRemoveTag, tagSelectedComponent: TagSelectedComponent, translations } = this.props;

        return (
            <div
                onClick={() => this.inputRef.current.focus()}
                className={`ais-TagsBox ${currentRefinement !== '' ? 'opened' : ''}`}
            >
                <ul className="ais-TagsBox-tags">
                    {tags.map(tag =>
                        <li key={tag.objectID} className="ais-TagsBox-tag" onClick={() => onRemoveTag(tag.objectID)}>
                            <TagSelectedComponent hit={tag} />
                            <span className="ais-TagsBox-removeTag">✕</span>
                        </li>
                    )}

                    <li className="ais-TagsBox-inputTag">
                        <input type="text"
                               ref={this.inputRef}
                               value={inputValue}
                               onKeyDown={this.catchSpecialKeys}
                               onChange={this.onInputValueChange}
                               autoCapitalize="off" autoComplete="off" autoCorrect="off"
                               placeholder={translations && (translations.placeholder ? translations.placeholder : '')} spellCheck="false" />
                    </li>
                </ul>
            </div>
        )
    }
}

TagsBoxContainer.propTypes = {
    tags: PropTypes.array.isRequired,
    onRemoveTag: PropTypes.func.isRequired,
    tagSelectedComponent: PropTypes.func.isRequired
};

export default connectAutoComplete(TagsBoxContainer);