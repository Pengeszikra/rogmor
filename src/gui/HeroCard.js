import React from 'react';

export const ProcessBar = ({process = 1, ...props}) => (
  <figure className='button-b' {...props}>
    <div className='process-bar-indicator' style={{width: process * 254}}/>
  </figure>
);

export const MultiProcessBar = ({process = [1,1,1], ...props}) => {
  const [stm, wil, mry] = process;
  return (
    <figure className='button-b' {...props}>
      <div className='process-bar-indicator' data-process="stm" style={{width: (stm || 0) * 254}}/>
      <div className='process-bar-indicator' data-process="wil" style={{width: (wil || 0) * 254}}/>
      <div className='process-bar-indicator' data-process="mry" style={{width: (mry || 0) * 254}}/>
    </figure>
  );
}

export default ({hero, children, ...props}) => {
  const {heroId, name, profession, level, body, reaction, soul, stamina, will, staminaState, willState, popular, joyful, joyfulState } = hero;
  // const [process, setProcess] = useState(0);

  return (
    <section className='gui gui-storyw' {...props}>
      <figure className='face-sprite' data-face={heroId} />
      <span className='text-xl'>{name} the {profession}</span>
      <pre className='leading-tight text-s'>{`
        Level: ${level}
         Body: ${body}
         Soul: ${soul}
     Reaction: ${reaction}
      Popular: ${popular}
      Stamina: ${staminaState} / ${stamina}
         Will: ${willState} / ${will}
       Joyful: ${joyfulState} / ${joyful}
        `}
        {/* <MultiProcessBar process={[staminaState / stamina, willState / will, joyfulState / joyful]} style={{width: 160, marginLeft: 15, marginTop: -10}} /> */}
      </pre>
      {children}
    </section>    
  );
}