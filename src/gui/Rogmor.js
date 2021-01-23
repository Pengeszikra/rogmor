import React, {useState, useEffect} from 'react';
import styler from './scss/styler';
import asset from './scss/asset';
import GothicWindow from './GothicWindow';
import Battle from './Battle';
import Leveling from './Leveling';

const [Page, SimpleButton] = styler('page', 'gui simple-button button-line');

const Intro = ({changeRoute}) =>  (    
  <Page>
      <GothicWindow>
          Experimental functional react RPG
          <br/><br/>
          Onece upon the time was land of Rogmor, where ...
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