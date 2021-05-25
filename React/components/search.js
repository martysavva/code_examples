//libs
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// components
import TextInput from "../text-input/text-input";
import Button from "../button/button";

// helpers
import cleanseSearchInput from "../../helpers/cleanse-search-input";

// styles
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;
Wrapper.displayName = 'Wrapper';

class Search extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {canSearch: true}
  }


  static propTypes = {
    CONSTS: PropTypes.object,
    handleSearch: PropTypes.func,
    searchSetValue: PropTypes.func,
    value: PropTypes.string,
    buttonText: PropTypes.string
  };

  static defaultProps = {
    CONSTS: {},
    handleSearch: () => {},
    searchSetValue: () => {},
    value: "",
    buttonText: ""
  };

  submitSearch = (fn, value) => {
    if (value) {
      return fn();
    }
  };

  handleOnChange = (e) => {
    const {searchSetValue} = this.props;
    searchSetValue(cleanseSearchInput(e.target.value));
  };

  handleSearch = () => {
    const {handleSearch, value} = this.props;
    this.submitSearch(handleSearch, value);
    this.disableSearchButton(true);
  };

  disableSearchButton = () => {
    this.setState({canSearch: false});
    setTimeout(()=>this.setState({canSearch: true}), 1000)
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && this.state.canSearch) {
      this.handleSearch();
    }
  };


  render() {
    const {CONSTS, value, buttonText} = this.props;

    return (
      <Wrapper>
        <TextInput
          placeholder={CONSTS.fields.search}
          value={value}
          onChange={this.handleOnChange}
          onKeyPress={this.handleKeyPress}
          className={'search-field'}
        />
        <Button
          onClick={this.handleSearch}
          text={buttonText}
          className={'search-button'}
          disabled={!value || !this.state.canSearch}
          width={'160px'}
        />
      </Wrapper>
    );
  }
}

export default Search;

