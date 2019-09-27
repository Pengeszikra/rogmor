import React from 'react';

export default (...classList) => classList.map( className => props => <div className={className} {...props}/>);

export const showFactory = (...classList) => classList.map( className => ({show, ...props}) => show 
  ? <div className={className} {...props}/>
  : null 
);