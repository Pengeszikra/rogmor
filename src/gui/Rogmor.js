import React, {useState} from 'react';
import styler from './scss/styler';

import GothicWindow from './GothicWindow';
import Battle from './Battle';
import Leveling from './Leveling';


const [Page, SimpleButton, RogmorLogo] = styler('page', 'gui simple-button button-line', 'gui-rogmor_198x63');

const Intro = ({changeRoute}) =>  (    
  <Page>
    <GothicWindow>
      Experimental functional react RPG
      <br/><br/>
      Onece upon the time was land of Rogmor, where was a small pipeline ....
      <br/><br/>
      <SimpleButton onClick={() => changeRoute('battle')}>Battle test</SimpleButton>
      <SimpleButton onClick={() => changeRoute('leveling')}>Leveling</SimpleButton>
    </GothicWindow>
  </Page>
);

export default props => {
  const [route, changeRoute] = useState('.');
  return (
    <>
      {route == '.' && <Intro changeRoute={changeRoute} />}
      {route == 'leveling' && <Leveling changeRoute={changeRoute} />}
      {route == 'battle' && <Battle  changeRoute={changeRoute} />}
    </>
  );  
}