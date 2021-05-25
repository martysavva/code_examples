// Libs
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// components
import PagingButton from "./paging-button"


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: 10px;
`;
Wrapper.displayName = 'Wrapper';

class Paging extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {currentPage: 0};
    this.handleSetPage = this.handleSetPage.bind(this);
  }

  static propTypes = {
    numberOfPages: PropTypes.number,
    setPage: PropTypes.func
  };

  static defaultProps = {
    numberOfPages: 0,
    setPage: ()=>{}
  };


  componentDidUpdate(prevProps){
    // if not on on page 0 and number of pages are not equal then make all buttons inactive
    if(this.state.currentPage !== 0 && this.props.numberOfPages !== prevProps.numberOfPages){
      this.setState({currentPage: null})
    }
  }

  handleSetPage = (pageNumber) => {
    const { setPage } = this.props;
    // set the current button state
    this.setState({currentPage: pageNumber});
    // callback to move carousel
    setPage(pageNumber);
  };

  render(){
    const { numberOfPages } = this.props;

    //generate array from the numberOfPages integer
    const pageArray = [...Array(numberOfPages).keys()];
    return <Wrapper className={'paging'}>
      {numberOfPages && numberOfPages > 1 && pageArray.map((page)=>{
          return <PagingButton
            key={page}
            pageNumber={page}
            isActive={this.state.currentPage === page}
            onClick={this.handleSetPage}
          />
        })
      }
    </Wrapper>
  }
}

export default Paging;


