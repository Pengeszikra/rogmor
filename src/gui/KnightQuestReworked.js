import { useEffect } from 'react';
import { useNoreboReducerTwo } from '../rpg/useNoreboReducerTwo';
import HeroCard from './HeroCard';
import HeroCardLine from './HeroCardLine';
import { MobilFrame } from './MobilFrame';
import { Button70 } from './setOfGuiElements';
import { jlog } from './TeamTest';

const StoryLine = ({text}) => <div className="story-line">{text}</div>;

export default () => {

  const [
    {units, hero, quest, story}, 
    {nextRound, addUnit, addRandom, removeUnit, selectHero, adventure}
  ] = useNoreboReducerTwo();

  useEffect( _ => {
    Array(24).fill().map(_ => addRandom(5))
  }, []);

  return (
    <MobilFrame>
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {!hero && units.map(unit => (
          <HeroCardLine hero={unit} key={unit?.uid} color="#FED" style={{width: 140}} onClick={ _ => unit |> selectHero}/>
        ))}
        
      </div>

      {hero && (
        <section style={{display:'flex', flexWrap:'wrap'}}>
          <HeroCardLine hero={hero} color="#FED"/>
          <Button70 
            inset="primary" 
            style={{marginLeft:'1em'}}
            onClick={ _ => quest ? nextRound() : hero |> adventure}
          >mission</Button70>
        </section>
      )}
      {quest && quest.mob && quest.hero && (
        <section style={{display:'flex', flexWrap:'wrap', alignContent:'space-between'}}>
          <HeroCardLine hero={quest.hero} color="#FED"/>
          <HeroCardLine hero={quest.mob} color="#FED"/>
        </section>
      )}

      {hero && story.slice().reverse().map((line, key) => (
        <StoryLine key={key} text={line} />
      ))}
      
  </MobilFrame>
  );
}