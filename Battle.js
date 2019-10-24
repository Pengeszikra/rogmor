import React, {useState, useEffect} from 'react';
import styler from './styler';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';
import generateName from './generateName';
import profession from './profession';
import { pipe, fromIter, forEach, interval } from 'callbag-basics';
import  sample from 'callbag-sample';

const  [Page, FaceSprite, BattleTeam, CloseButton, SimpleButton] = 
styler ('page', 'face-sprite', 'battle-team', 'gui gui-xButton right-top', 'gui simple-button');

const heroFactory = heroId => ({heroId, name: generateName(), ...profession()});

const north = [33, 78, 11, 22, 32, 25].map(id => heroFactory(id));
const south = [34, 79, 12, 23, 72, 26].map(id => heroFactory(id));

const Heroes = ({onChoose, onChuuse}) => (
  <GothicWindow>
    <BattleTeam>
      {north.map(hero => <FaceSprite data-face={hero.heroId} onClick={onChoose(hero)}/>)}
    </BattleTeam>
    <br/>
    <BattleTeam>
       {south.map(hero => <FaceSprite data-face={hero.heroId} onClick={onChuuse(hero)}/>)}
    </BattleTeam>    
  </GothicWindow>
);

export default props => {
  const [who, chooseWho] = useState(null);
  const [whu, chooseWhu] = useState(null);
  const [fightLog, logFight] = useState('');

  const onChoose = hero => event => chooseWho(hero);
  const onChuuse = hero => event => chooseWhu(hero);

  const letsFight = event => {
    pipe (
      interval(2000),
      sample(fromIter([who, whu])),            
      forEach( 
        mob =>  logFight( JSON.stringify(mob, null, 2))
      )
    );
  }

  return (    
    <Page>
        <h1>Battle simulation</h1>      
        <Heroes onChoose={onChoose} onChuuse={onChuuse} />
        {who && (
          <HeroCard hero={who}>
            <CloseButton onClick={_=>chooseWho(null)} />
          </HeroCard>
        )}        
        {who && whu && <SimpleButton onClick={letsFight}>Fight</SimpleButton>}
        <pre>{fightLog}</pre>
        {whu && (
          <HeroCard hero={whu}>
            <CloseButton onClick={_=>chooseWhu(null)} />
          </HeroCard>
        )}         
    </Page>
  );
}
