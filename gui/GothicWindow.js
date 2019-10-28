import React from 'react';
import styler from './styler';
import asset from './asset';

const [ModalWindow, ModalWindowInner, Slice9GridHolder, GothicBackground, SliceContent] = styler
      ('modal-window', 'modal-window-ModalWindowInner', 'slice-9-grid-holder', 'modal-window slice-extra', 'slice-content');

export default ({children}) => {
  return (    
    <Slice9GridHolder>
      <SliceContent>
        {children}
      </SliceContent>
      <GothicBackground/>      
    </Slice9GridHolder>
  );
}
