import React from 'react';
import PropTypes from "prop-types";

const withMultiSelect = (WrappedComponent) => {

  return class HOC extends React.Component {

    constructor(props){
      super(props);
      this.handleOnClick = this.handleOnClick.bind(this);
      this.ctrlClick = this.ctrlClick.bind(this);
      this.shiftClick = this.shiftClick.bind(this);
    }

    static propTypes = {
      subjectId: PropTypes.string,
      outfitId: PropTypes.string,
      associatedId: PropTypes.string,
      msVariantId: PropTypes.string,
      selectedVariants: PropTypes.array,
      lastSelected: PropTypes.string,
      msArray: PropTypes.array,
      setSelected: PropTypes.func,
      onClick: PropTypes.func
    };

    static defaultProps = {
      subjectId: '',
      outfitId: '',
      associatedId: '',
      msVariantId: '',
      selectedVariants: [],
      lastSelected: '',
      msArray: [],
      setSelected: ()=>{},
      onClick: ()=>{}
    };

    ctrlClick = () => {
      const {subjectId, outfitId, associatedId, msVariantId, selectedVariants, setSelected } = this.props;
      //if variant is already in selectedVariants
      if(selectedVariants.includes(msVariantId)){
        const variants = [...selectedVariants.filter((id)=>id!==msVariantId)];
        setSelected({subjectId, outfitId, associatedId, variants, variantId: ''})
      }
      //if variant is not in selectedVariants
      if(!selectedVariants.includes(msVariantId)){
        const variants = [...selectedVariants, msVariantId];
        setSelected({subjectId, outfitId, associatedId, variants, variantId: msVariantId})
      }
    };

    shiftClick = () => {
      const {subjectId, outfitId, associatedId, msVariantId, lastSelected, msArray, setSelected } = this.props;

      // if no lastSelected available then do left click
      if(!lastSelected){
        this.leftClick();
      }

      if(lastSelected){
        // array of indices, we sort so we can slice the existing array
        const selectedIndicesArray = [];
        selectedIndicesArray.push(msArray.indexOf(lastSelected));
        selectedIndicesArray.push(msArray.indexOf(msVariantId));
        selectedIndicesArray.sort((a,b)=>a-b);

        // create array of variants between index a - b
        const selectedVariants = msArray.slice(selectedIndicesArray[0],selectedIndicesArray[1]+1);
        setSelected({subjectId, outfitId, associatedId, variants: selectedVariants, variantId: msVariantId})
      }
    };

    leftClick = () => {
      const {subjectId, outfitId, associatedId, msVariantId, setSelected } = this.props;
      const variants = [msVariantId];
      setSelected({subjectId, outfitId, associatedId, variants, variantId: msVariantId});
    };

    handleOnClick(e){
      const {onClick} = this.props;
      e.preventDefault();

      // if left click and ctrl key
      if(e.button === 0 && e.ctrlKey && !e.shiftKey){
        this.ctrlClick();
      }

      // if left click and shift key
      if(e.button === 0 && e.shiftKey && !e.ctrlKey){
        this.shiftClick();
      }

      // if just left click
      if(e.button === 0 && !e.shiftKey && !e.ctrlKey){
        this.leftClick();
      }

      // pass onClick to any other HOC's that require it
      onClick(e);
    }


    render() {
      return(
          <WrappedComponent {...this.props} onClick={this.handleOnClick} onContextMenu={this.handleOnClick}  />
      );
    }
  }
};

export default withMultiSelect;