import styler from './scss/styler';


const [ModalWindow, ModalWindowInner, Slice9GridHolder, GothicBackground, SliceContent] = styler(
  'modal-window', 
  'modal-window-ModalWindowInner', 
  'slice-9-grid-holder', 
  'modal-window slice-extra', 
  'slice-content'
);

export default ({children, ...props}) => {
  return (    
    <Slice9GridHolder>
      <SliceContent>
        {children}
      </SliceContent>
      <GothicBackground {...props}/>
    </Slice9GridHolder>
  );
}
