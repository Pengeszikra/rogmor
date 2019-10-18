import React, {useState, useEffect} from 'react';
import styler from './styler';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';
import generateName from './generateName';
import profession from './profession';

const [Page, FaceSprite, BattleTeam, CloseButton, SimpleButton] = styler('page', 'face-sprite', 'battle-team', 'gui gui-xButton right-top', 'gui simple-button');

const heroFactory = heroId => ({heroId, name: generateName(), ...profession()});

const north = [33, 78, 11, 22, 32, 25].map(id => heroFactory(id));
const south = [34, 79, 12, 23, 33, 26].map(id => heroFactory(id));

const NameGenerator = () => {
  const [name, setName] = useState('');
  const onGenerate = () => setName(generateName());
  return (
    <>
      <SimpleButton onClick={onGenerate}>Generate Name</SimpleButton>
      <h1>{name}</h1>
    </>    
  );
}

const Heroes = ({onChoose}) => (
  <GothicWindow>
    <BattleTeam>
      {north.map(hero => <FaceSprite data-face={hero.heroId} onClick={onChoose(hero)}/>)}
    </BattleTeam>
    <br/>
    <BattleTeam>
       {south.map(hero => <FaceSprite data-face={hero.heroId} onClick={onChoose(hero)}/>)}
    </BattleTeam>    
  </GothicWindow>
);

export default props => {
  const [who, chooseWho] = useState(null);

  const onChoose = hero => event => chooseWho(hero);

  return (    
    <Page>
        <h1>Battle simulation</h1>      
        <Heroes onChoose={onChoose} />
        {who && (
          <HeroCard hero={who}>
            <CloseButton onClick={_=>chooseWho(null)} />
          </HeroCard>
        )} 
    </Page>
  );
}
