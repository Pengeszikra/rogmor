import React, {useState, useEffect} from 'react';
import styler from './styler';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';

const [Page, FaceSprite, BattleTeam, CloseButton] = styler('page', 'face-sprite', 'battle-team', 'gui gui-xButton right-top');

const north = [33, 78, 11, 22, 32, 25];
const south = [34, 79, 12, 23, 33, 26];


const Heroes = ({onChoose}) => (
  <GothicWindow>
    <BattleTeam>
      {north.map(heroId => <FaceSprite data-face={heroId} onClick={onChoose(heroId)}/>)}
    </BattleTeam>
    <br/>
    <BattleTeam>
       {south.map(heroId => <FaceSprite data-face={heroId} onClick={onChoose(heroId)}/>)}
    </BattleTeam>    
  </GothicWindow>
);

export default props => {
  const [who, chooseWho] = useState(null);

  const onChoose = heroId => event => chooseWho(heroId);

  return (    
    <Page>
      <h1>Battle simulation</h1>
      <Heroes onChoose={onChoose} />
      {who && (
        <HeroCard hero={{heroId:who}}>
          <CloseButton onClick={_=>chooseWho(null)} />
        </HeroCard>
      )}
    </Page>
  );
}
