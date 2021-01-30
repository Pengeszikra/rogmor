import React, {useState, useEffect} from 'react';
import styler from './scss/styler';
import HeroCard from './HeroCard';
import GothicWindow from './GothicWindow';
import generateName from '../rpg/generateName';
import profession from '../rpg/profession';
import { pipe, fromIter, forEach } from 'callbag-basics';
import interval from 'callbag-interval';
import sample from 'callbag-sample';
import {improved, shuffle} from '../rpg/rpg';

const  [Page, FaceSprite, BattleTeam, CloseButton, SimpleButton] = 
styler ('page', 'face-sprite', 'battle-team', 'gui gui-xButton right-top', 'gui simple-button');
const [GothicCloseButton] = styler('gui gui-xButton right-top-gothic');
const heroFactory = heroId => ({heroId, name: generateName(), ...profession()});

const faces = Array.from({length:100}, (_, i) => i).sort(shuffle);

const north = faces.slice(-5).map(id => heroFactory(id));
const south = faces.slice(0, 5).map(id => heroFactory(id));

const Heroes = ({onChoose, changeRoute, onChuuse}) => (
  <GothicWindow>
    <GothicCloseButton onClick={_=>changeRoute('.')} />
    <BattleTeam>
      {north.map(hero => <FaceSprite data-face={hero.heroId} onClick={onChoose(hero)} style={{opacity: hero.staminaState / hero.stamina}}/>)}
    </BattleTeam>
    <br/>
    <BattleTeam>
       {south.map(hero => <FaceSprite data-face={hero.heroId} onClick={onChuuse(hero)} style={{opacity: hero.staminaState / hero.stamina}}/>)}
    </BattleTeam>    
  </GothicWindow>
);

export default ({changeRoute}) => {
  const [who, chooseWho] = useState(null);
  const [whu, chooseWhu] = useState(null);
  const [fightLog, logFight] = useState('');

  const logf = log => logFight(logs => [logs, log].join('\n'));

  const onChoose = hero => event => chooseWho(hero);
  const onChuuse = hero => event => chooseWhu(hero);

  function * fight(...mobs) {
    const [a, b] = mobs;
    yield `\n`;
    yield `${a.name} - ${a.profession} : ${a.level} : ${a.reaction}`;
    yield 'vs.';
    yield `${b.name} - ${b.profession} : ${b.level} : ${b.reaction}`;
    yield '-'.repeat(20);
    yield `${a.reaction} : ${b.reaction}`;
    const astart = improved(a.reaction) 
    const bstart = improved(b.reaction)
    const [atk, def] = astart > bstart ? [a, b] : [b, a];
    yield `Attacker is: ${atk.name} ${astart} vs ${bstart}`;    
    let round = 1;
    while (def.staminaState > 0 && atk.staminaState > 0) {      
      let [striker, target] = round % 2 ? [atk, def] : [def, atk];
      let dmg = improved(striker.physique / 2);
      yield `round: ${round} - ${striker.name} - strike ${dmg}`;
      round ++;
      target.staminaState -= Math.min(dmg, target.staminaState);
      yield `${target.name} ${target.stamina}/${target.staminaState}`;
    }
    yield `${atk.staminaState <= 0 ? atk.name : '' } knocked out`;
    yield `${def.staminaState <= 0 ? def.name : '' } knocked out`;
  }
  
  // const letsFight = event => {
  //   pipe (
  //     interval(30),
  //     sample(fromIter(fight(who, whu))),            
  //     forEach( mob => logf(mob) )
  //   );
  // }

  const letsFight = event => {
      interval(30) |>
      sample(fromIter(fight(who, whu))) |>
      forEach( mob => logf(mob) )
  };

  return (    
    <Page>
        <h1>Simple Battle Simulation</h1>      
        <Heroes onChoose={onChoose} onChuuse={onChuuse} changeRoute={changeRoute} />
        {who && whu && 
          <SimpleButton onClick={letsFight}>Fight</SimpleButton>
        }
        {who && (
          <HeroCard hero={who}>
            <CloseButton onClick={_=>chooseWho(null)} />
          </HeroCard>
        )}        
        {whu && (
          <HeroCard hero={whu}>
            <CloseButton onClick={_=>chooseWhu(null)} />
          </HeroCard>
        )}         
        {false && <pre>{fightLog}</pre>}
    </Page>
  );
}
