import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

// components
import Portal from "../components/portal/portal";

const portalRoot = document.getElementById('tooltip-root');

const previewInfoTooltip = (WrappedComponent) => {

  //<editor-fold desc="Styles">

  const Tooltip = styled.div`
    visibility: visible;
    animation: fadein .5s; //fade in on load (uses keyframes below)
    background-color: ${props => props.theme.color13};
    color: ${props => props.theme.color12};
    text-align: center;
    font-size: ${props => props.theme.size14};
    padding: 23px 5px 23px 25px;
    border-radius: 2px;
    margin-top:7px;
 
    /* Position the tooltip text */
    position: absolute;
    top: 100%;
    right: 0;
    left: auto;
    z-index: 100;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    //fade in on load
    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    
    
    &:after {
      content: " ";
      position: absolute;
      bottom: 100%;
      top: auto;
      right: 6px;
      margin-left: -10px;
      left: auto;
      margin-right: auto;
     
      border-width: 5px;
      border-style: solid;
      border-top-color: transparent;
      border-right-color: transparent;
      border-bottom-color: ${props => props.theme.color13};
      border-left-color: transparent;
    }
  `;

  const ContentContainer = styled.div`
    width: 665px;
    height: 295px;
    overflow: hidden;
  `;

  const Scrollable = styled.div`
    width:100%;
    height: inherit;
    text-align: left;
    overflow-y: auto;
    padding-right: 12px;
    
    &::-webkit-scrollbar {
      background: ${props => props.theme.color4pcnt50};
      width:7px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.color5};
    }
  `;

  const Title = styled.div`
    font-weight: 700;
    font-size: ${props => props.theme.size18};
    padding-bottom: 8px;
    Border-bottom: 1px solid ${props => props.theme.color4}
  `;

  const Rule = styled.div`
    width: 100%;
    font-size: ${props => props.theme.size16};
    Border-bottom: 1px solid ${props => props.theme.color4}
    padding: 10px 0;
  `;

  const Position = styled.div`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
  `;
  //</editor-fold>

  const WithTooltip = (props) => {
    const {currentChangesIds, recommendations, recommendationsOrder, rules, drawerRef, title} = props;

    // vars
    const objRef = React.createRef();
    let timeout = null;

    // state
    const [isOpen, setIsOpen] = useState(false);
    const [yPos, setYPos] = useState(0);
    const [xPos, setXPos] = useState(0);

    // effect
    useEffect(() => {
      drawerRef.addEventListener('scroll', handleScroll);

      // clean up
      return ()=>{
        drawerRef.removeEventListener('scroll', handleScroll);
      }
    },  [drawerRef]);


    //<editor-fold desc="Methods">
    const handleMouseEnter = () => {
      const boundingClientRect = objRef.current.getBoundingClientRect();
      setYPos((boundingClientRect.y + boundingClientRect.height) + 2);
      setXPos((boundingClientRect.x + boundingClientRect.width) );
      clearTimeout(timeout);
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeout = setTimeout(()=>setIsOpen(false), 500)
    };

    const handleScroll = () => {
      clearTimeout(timeout);
      setIsOpen(false);
    };

    const generateRuleResults = () => {
      // create object to keep track of number of rules
      let rulesObject = {};

      // fill object with named objects and initialise each with 0
      currentChangesIds.map((ruleId)=>{
        return rulesObject[ruleId] = 0;
      });

      // map over recommendations and increment each rule on rulesObject as its found
      recommendationsOrder.map((recommendationId) => {
        let recommendationRuleId = recommendations[recommendationId].rule;
        if(typeof rulesObject[recommendationRuleId] != 'undefined'){
          return rulesObject[recommendationRuleId] += 1;
        }
        return false;
      });

      // map over current rule templates and generate output content
      return currentChangesIds.map((ruleId)=>{
        return <Rule key={ruleId}>Rule {rules[ruleId].ruleNumber} = {rules[ruleId].ruleTemplates} ({rulesObject[ruleId]})</Rule>;
      });
    };
    //</editor-fold>

    // UI
    return(
      <div className={'preview-info-tooltip-container'}>
        <WrappedComponent {...props} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} innerRef={objRef}/>

        {isOpen &&
          <Portal portalroot={portalRoot}>
            <Position x={xPos} y={yPos}>
              <Tooltip className={'preview-info-tooltip'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ContentContainer>
                  <Scrollable>
                    <Title>{title}</Title>
                    {generateRuleResults()}
                  </Scrollable>
                </ContentContainer>
              </Tooltip>
            </Position>
          </Portal>
        }
      </div>
    );
  };

  WithTooltip.propTypes = {
    currentChangesIds: PropTypes.array,
    recommendations: PropTypes.object,
    recommendationsOrder: PropTypes.array,
    rules: PropTypes.object,
    drawerRef: PropTypes.object,
    title: PropTypes.string
  };

  WithTooltip.defaultProps = {
    currentChangesIds: [],
    recommendations: {},
    recommendationsOrder: [],
    rules: {},
    drawerRef: {},
    title: ''
  };

  return WithTooltip;
};

export default previewInfoTooltip;