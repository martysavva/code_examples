// Libs
import React, {Fragment} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Primary = styled.button`
  background: ${props => props.disabled ? props.theme.color2 : props.theme.color1};
  color: ${props => props.disabled ? props.theme.color5 : props.theme.color2};
  border-radius: 2px;
  font-size: ${props => props.small ? props.theme.size12 : props.theme.size14};
  font-weight: 400;
  text-align: center;
  min-height:${props => props.small ? 24 : 36}px;
  padding: 0 ${props => props.width ? 0 : 20}px;
  width: ${props => props.width ? props.width : "auto"};
  border: 1px solid ${props => props.disabled ? props.theme.color5 : 'transparent'};
  user-select: none;
  white-space: nowrap;
  
  &:focus {outline:none};
  &:hover {
    background: ${props => props.disabled ? props.theme.color2 : props.theme.color6};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
  }
`;
Primary.displayName = 'Primary';

const Secondary = styled(Primary)`
  background: ${props => props.theme.color2};
  color: ${props => props.disabled ? props.theme.color5 : props.theme.color1};
  
  &:hover {
    background: ${props => props.disabled ? props.theme.color2 : props.theme.color3};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
  }
`;
Secondary.displayName = 'Secondary';

const Tertiary = styled(Primary)`
  background: ${props => props.theme.color2};
  color: ${props => props.disabled ? props.theme.color5 : props.theme.color1};
  border-color: ${props => props.disabled ? props.theme.color4 : props.theme.color1};
  
  &:hover {
    background: ${props => props.disabled ? props.theme.color2 : props.theme.color3};
    border-color: ${props => props.disabled ? props.theme.color4 : props.theme.color3};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
  }
  
  &:active {
    background: ${props => props.theme.color4};
    box-shadow:none;
    border-color:transparent;
  }
`;
Tertiary.displayName = 'Tertiary';


const Button = ({ text, onClick, disabled, width, buttonType, className, small }) => {
  const renderButton = () => {
    switch(buttonType) {
      case 'tertiary':
        return <Tertiary onClick={onClick} disabled={disabled} width={width} className={className} small={small}>{text}</Tertiary>;
      case 'secondary':
        return <Secondary onClick={onClick} disabled={disabled} width={width} className={className} small={small}>{text}</Secondary>;
      default:
        return <Primary onClick={onClick} disabled={disabled} width={width} className={className} small={small}>{text}</Primary>;
    }
  };
  return (
    <Fragment>
      {
        renderButton()
      }
    </Fragment>

  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  width: PropTypes.string,
  buttonType: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool
};

Button.defaultProps = {
  onClick: () => {},
  text: "",
  disabled: false,
  width: "",
  buttonType: "",
  className: "",
  small: false
};

export default Button;