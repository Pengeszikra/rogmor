import React from 'react';
import divFactory from './divFactory';
import asset from './asset';

const [Wireframe, Hero, Valami] = divFactory('wireframe', 'hero', 'valami');

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
    <img src={asset + 'img/rogmor_198x63.png'} />
    <pre>{`
    Plan: rework my old MMO RPG by react
    target platform : mobile

    Used developer enviroment: stackblitz.com
    `}</pre>
    <Valami>
      {Array.from({length:15}, (_, face) => <Fazon face={face} key={face} />)}
    </Valami>
  </Wireframe>
);