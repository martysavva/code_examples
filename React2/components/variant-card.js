//libs
import React, {Fragment} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// config
import * as config from "../../config/config";

// components
import VariantCardImage from "./variant-card-image";
import VariantCardDescription from "./variant-card-description";
import VariantCardStock from "./variant-card-stock";
import VariantCardDelete from "./variant-card-delete";
import VariantCardSliderControl from "./variant-card-slider-control";
import VariantCardSlider from "./variant-card-slider";
import VariantCardVisibilitySlide from "./variant-card-visibility-slide";


//<editor-fold desc="Styles">
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  width: ${config.variant.width}px;
  height: ${config.variant.height}px;
`;
Wrapper.displayName = 'Wrapper';

const FadedBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${props => props.isGreen ? props.theme.color7 : props.theme.color1};
  width: ${config.variant.width}px;
  height: ${config.variant.height}px;
  pointer-events: none;
  opacity: 0;
  //fade out when manually added
  animation: fadeOut 3s;
  @keyframes fadeOut {
      from { opacity: 1; }
      to   { opacity: 0; }
  }
`;
FadedBorder.displayName = 'FadedBorder';

const IsSelectedBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${props => props.theme.color1};
  width: ${config.variant.width}px;
  height: ${config.variant.height}px;
  pointer-events: none;
`;
IsSelectedBorder.displayName = 'IsSelectedBorder';

const Variant = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  background: ${props => props.theme.color2};
  width: ${config.variant.width}px;
  height: ${config.variant.height}px;
  border: 1px solid ${props => 
    props.isAssociatedVariant 
      ? props.theme.color5
      : props.isMouseDown 
      ? props.theme.color4 
      : props.theme.color4
  };
  border-radius: 2px;
  overflow: hidden;
  
  &:hover {
    cursor: ${props => props.isAssociatedVariant ? 'default' : props.isMouseDown ? 'grab' : 'pointer'};
  }
`;
Variant.displayName = 'Variant';

const ControlsPosition = styled.div`
  position: absolute;
  bottom: 0;
  border-bottom: 7px solid ${props => props.theme.color2};
  background: ${props => props.theme.color2};
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30px;
  justify-content: space-between;
  padding: 0 8px;
`;
ControlsPosition.displayName = 'ControlsPosition';

const VariantError = styled.div`
  font-size: ${props => props.theme.size12};
  font-weight: 600;
  color: ${props => props.theme.color8};
  margin-top: 2px;
`;
VariantError.displayName = 'VariantError';

const VariantIdError = styled.div`
  font-size: ${props => props.theme.size11};
  width: 116px;
  word-wrap: break-word;
`;
VariantIdError.displayName = 'VariantIdError';

const Spacer = styled.div`
  width:10px;
  background-color: white;
  height: 2px;
`;
Spacer.displayName = 'Spacer';

const ManuallyAddedIndicator = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  border-bottom: solid 10px rgb(0,0,0);
  border-left: solid 10px rgb(0,0,0);
  border-right: solid 10px transparent;
  border-top: solid 10px transparent;
  pointer-events: none;
`;
ManuallyAddedIndicator.displayName = 'ManuallyAddedIndicator';

const HighlightBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${config.variant.width}px;
  height: ${config.variant.height}px;
  background: rgba(255, 255, 255, .75);
  pointer-events: none;
`;
HighlightBody.displayName = 'HighlightBody';

const HighlightBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${config.variant.width}px;
  height: ${config.variant.height}px;
  background: none;
  border: 1px solid rgba(255, 255, 255, .5);
  pointer-events: none;
`;
HighlightBorder.displayName = 'HighlightBorder';
//</editor-fold>


class VariantCard extends React.Component {

  constructor(props){
      super(props);
      this.variantAddedTimer = null;
      this.state = {rotated: false, mouseDown: false, variantAdded: false};
  }

  //<editor-fold desc="PropTypes">
  static propTypes = {
    error: PropTypes.string,
    CONSTS: PropTypes.object,
    data: PropTypes.object,
    associatedId: PropTypes.string,
    subjectId: PropTypes.string,
    outfitId: PropTypes.string,
    className: PropTypes.string,
    isAssociatedVariant: PropTypes.bool,
    isReplacementVariant: PropTypes.bool,
    isYMALSubject: PropTypes.bool,
    wasAdded: PropTypes.bool,
    wasCopied: PropTypes.bool,
    isSelected: PropTypes.bool,
    selectedVariants: PropTypes.array,
    highlight: PropTypes.bool,
    deleteReplacementVariants: PropTypes.func,
    variantFocusReset: PropTypes.func,
    onContextMenu: PropTypes.func,
    onClick: PropTypes.func
  };

  static defaultProps = {
    error: null,
    CONSTS: {},
    data: {},
    associatedId: null,
    subjectId: null,
    outfitId: null,
    className: "",
    isAssociatedVariant: false,
    isReplacementVariant: false,
    isYMALSubject: false,
    wasAdded: false,
    wasCopied: false,
    isSelected: false,
    selectedVariants: [],
    highlight: false,
    deleteReplacementVariants: ()=>{},
    variantFocusReset: ()=>{},
    onContextMenu: ()=>{},
    onClick: ()=>{}
  };
  //</editor-fold>

  //<editor-fold desc="Methods">
  componentDidMount(){
    const { variantFocusReset, wasAdded } = this.props;
    if(wasAdded){
      variantFocusReset();
      this.setState({variantAdded:true});
      // set a timer of 1 second to allow animated outline to complete then reset 'variantAdded'
      this.variantAddedTimer = setTimeout(()=>this.setState({variantAdded:false}), 1000);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { variantFocusReset } = this.props;

    // reset variant focus so we dont have black outline when dragging
    if(prevProps.wasCopied && this.props.wasCopied){
      variantFocusReset();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.variantAddedTimer);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {

    // update to show green outline
    if(!this.state.variantAdded && nextState.variantAdded){
      return true;
    }

    // update to hide green outline
    if(this.state.variantAdded && !nextState.variantAdded){
      return true;
    }

    // np update whilst green outline is animating
    if(this.state.variantAdded && nextState.variantAdded){
      return false;
    }

    // evaluate other conditions to allow update
    const rotated = this.state.rotated !== nextState.rotated;
    const mouseDown = this.state.mouseDown !== nextState.mouseDown;
    const isSelected = this.props.isSelected !== nextProps.isSelected;
    const highlight = this.props.highlight !== nextProps.highlight;
    const copied = this.props.wasCopied !== nextProps.wasCopied;

    return rotated || mouseDown || isSelected || highlight || copied;
  }

  handleDeleteReplacementVariant = (e) => {
    const {data, subjectId, deleteReplacementVariants, selectedVariants} = this.props;
    return deleteReplacementVariants({subjectId, replacementId:data.variantId, selectedVariants})
  };

  handleMouseEnter = () => {
    this.setState({rotated: true})
  };

  handleMouseLeave = () => {
    this.setState({rotated: false})
  };

  handleMouseDown = () => {
    this.setState({mouseDown: true});
  };

  handleMouseUp = () => {
    this.setState({mouseDown: false});
  };
  //</editor-fold>


  render() {
    const {
        isAssociatedVariant,
        isReplacementVariant,
        isYMALSubject,
        CONSTS,
        data,
        error,
        className,
        onContextMenu,
        onClick,
        isSelected,
        highlight
    } = this.props;

    const sliderControl =
      error
        ? (<Spacer/>)
        : (<VariantCardSliderControl onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />);

    const deleteControl =
      isAssociatedVariant || isReplacementVariant || isYMALSubject
        ? (<Spacer/>)
        : (<VariantCardDelete onClick={this.handleDeleteReplacementVariant}/>);

    const stock =
      error
        ? (<Spacer/>)
        : (<VariantCardStock data={data}/>);


    return (
      <Wrapper onContextMenu={onContextMenu} onClick={onClick}>

        <Variant
          isAssociatedVariant={isAssociatedVariant}
          isMouseDown={this.state.mouseDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseUp}
          className={className}
        >


          {/*Visibility indicators at top of variant*/}
          {
            !error && data.visibility &&
            <VariantCardVisibilitySlide
              rotated={this.state.rotated}
              data={data.visibility}
            />
          }


          {/*Main description*/}
          {!error &&
            <VariantCardDescription data={data} CONSTS={CONSTS} rotated={this.state.rotated}/>
          }

          {!!error &&
            <Fragment>
              <VariantError className={'error'}>{data.error}</VariantError>
              <VariantIdError className={'variant-id'}>{data.variantId}</VariantIdError>
            </Fragment>
          }

          {!error &&
            <VariantCardSlider
              CONSTS={CONSTS}
              data={data}
              rotated={this.state.rotated}
            />
          }

          {/*Image*/}
          <VariantCardImage photo={data.photo} error={!!error}/>

          <ControlsPosition>
            {sliderControl}
            {stock}
            {deleteControl}
          </ControlsPosition>


          {/* was manually added*/}
          {!isAssociatedVariant && !isReplacementVariant && data.indicateAsManuallyAdded &&
            <ManuallyAddedIndicator className='manually-added-indicator'/>
          }

          {/*Highlight variant*/}
          {highlight && <HighlightBody className={'mask'}/>}

        </Variant>

        {/*Highlight variant*/}
        {highlight && <HighlightBorder/>}

        {this.state.variantAdded && <FadedBorder isGreen={true}/>}

        {this.props.wasCopied && <FadedBorder />}

        {isSelected && <IsSelectedBorder />}


      </Wrapper>
    );
  }
}

export default VariantCard;
