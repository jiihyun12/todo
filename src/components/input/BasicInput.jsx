import React from 'react';
import Button from './style';
import Input from './style';


// variant, shape, size, border, color, font,
const BasicInput = ({ref, ...rest}) => {
  return (
    <Input ref={ref} {...rest}></Input>
  );
};

export default BasicInput;