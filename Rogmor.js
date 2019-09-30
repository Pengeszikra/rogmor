import React from 'react';
import divFactory from './divFactory';

const [Wireframe, Hero, Valami] = divFactory('wireframe', 'hero', 'valami');

const asset = "https://cdn.jsdelivr.net/gh/Pengeszikra/rogmor@master/assets/";
const heroStyle = face => ({
  backgroundImage : `url(${asset}faces/face${("0000" + face).slice(-4)}.png)`
});

const Fazon = ({face}) => (
  <Hero style={heroStyle(face)}>
    <span>fazon</span>
  </Hero>
);

export default props => (
  <Wireframe>
    <h1>RPGA </h1>    
    <Valami>
      {Array.from({length:15}, (_, face) => <Fazon face={face} key={face} />)}
    </Valami>
    <pre>
    {`
    `}
    </pre>
  </Wireframe>
);