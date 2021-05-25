import React, {useState} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

// components
import Portal from "../components/portal/portal";

const portalRoot = document.getElementById('tooltip-root');

const variantInfoTooltip = (WrappedComponent) => {

  //<editor-fold desc="Styles">
  const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
  `;
  const Tooltip = styled.div`
    visibility: visible;
    animation: fadein .5s; //fade in on load (uses keyframes below)
    width: 255px;
    background-color: ${props => props.theme.color13};
    color: ${props => props.theme.color12};
    text-align: center;
    font-size: ${props => props.theme.size14};
    padding: 10px;
    border-radius: 2px;
    margin-top:3px;
 
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
      right: 12px;
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

  const Content = styled.span`
    text-align: left;
    font-size: ${props => props.theme.size14};
    strong {
      font-size: inherit;
    }
`;
  const Position = styled.div`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
`;
  //</editor-fold>

  const WithTooltip = (props)  => {
    const {variantRef, isRuleIdVerified, ruleNumber, ruleTemplate, unknownRuleText} = props;

    const [isOpen, setIsOpen] = useState(false);
    const [yPos, setYPos] = useState(0);
    const [xPos, setXPos] = useState(0);

    const handleMouseEnter = () => {
      const boundingClientRect = variantRef.current.getBoundingClientRect();
      setYPos((boundingClientRect.y + boundingClientRect.height)-2);
      setXPos(boundingClientRect.x + boundingClientRect.width);
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      setIsOpen(false);
    };

    const tooltipContent = () => {
      const title = `${isRuleIdVerified ? `<strong>Rule ${ruleNumber} = </strong>` : ''}`;
      const body = `${!!ruleTemplate ? ruleTemplate : unknownRuleText}`;
      return `${title} ${body}`;
    };

    return(
        <TooltipContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={'variant-info-tooltip-container'}
        >

          <WrappedComponent {...props}  />

          {isOpen &&
            <Portal portalroot={portalRoot}>
              <Position x={xPos} y={yPos}>
                <Tooltip className={'variant-info-tooltip'}>
                  <Content
                    dangerouslySetInnerHTML={{__html: `${tooltipContent()}`}}
                    className={'variant-info-tooltip-text'}
                    />
                </Tooltip>
              </Position>
            </Portal>
          }
        </TooltipContainer>
      );
  };

  WithTooltip.propTypes = {
    variantRef: PropTypes.object,
    ruleNumber: PropTypes.number,
    isRuleIdVerified: PropTypes.bool,
    ruleTemplate: PropTypes.string,
    unknownRuleText: PropTypes.string
  };

  WithTooltip.defaultProps = {
    variantRef: {},
    ruleNumber: null,
    isRuleIdVerified: false,
    ruleTemplate: '',
    unknownRuleText: ''
  };

  return WithTooltip;
};

export default variantInfoTooltip;