import CompactHeroCard from "./CompactHeroCard"
import HeroCard from "./HeroCard";
import { Button, LoginWindow, NoreboMap } from "./setOfGuiElements";

export default ({troll:[{hero}, {setGameState}]}) => {
  return (<>
    <section style={{overflowX:'auto', marginBottom: 15}}>
      <NoreboMap  />
    </section>
    <HeroCard hero={hero} />
    <section className="large-button-group" style={{width:200, margin:'15px auto'}}>
      <Button inset="primary" onClick={ _ => setGameState(game => ({...game, isPlay: false}))}>Reroll your hero</Button>
    </section>
  </>);
}