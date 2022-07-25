import profession, { increaseLevel, profTypes } from "../rpg/profession";
import { useEntitiReducer } from "../rpg/useEntitiReduce";

const LEVEL_2_FIGHTER =     {
  name:'fooFighter',
  coord: 1,
  heroId: '42',
  level: 2,
  profession: "Fighter",

  body: 7,
  reaction: 6,
  soul: 5,
  popular: 6,

  stamina: 26,
  staminaState: 26,
  will: 22,
  willState: 22,
  joyful: 20,
  joyfulState: 20,

  type: {
    popular: 4,
    joyful: 40,
    body: 7,
    profession: "Fighter",
    reaction: 4,
    soul: 2,
    stamina: 55,
    will: 45,
  },
  uid: "42",
}

test ('create fighter', () => {  
  expect (
    profTypes.fighter
  ).toStrictEqual(
    { profession:'Fighter',  body: 7, reaction: 4, soul: 2, popular: 4, stamina: 55, will: 45, joyful: 40 }
  );
});

test ('create lvl 1 fighter', () => {
  expect (
    profession(1, profTypes.fighter, () => '42')
  ).toStrictEqual(
    {
        level: 1,
        popular: 2,
        joyful: 6,
        joyfulState: 6,
        body: 3,
        profession: "Fighter",
        reaction: 2,
        soul: 2,
        stamina: 8,
        staminaState: 8,
        type: {
          popular: 4,
          joyful: 40,
          body: 7,
          profession: "Fighter",
          reaction: 4,
          soul: 2,
          stamina: 55,
          will: 45,
        },
        uid: "42",
        will: 7,
        willState: 7,
      }
  )
});

test ('profession with extra fighter 2', () => {
  const fighter = profession(2, profTypes.fighter, () => '42');
  const fighterOnMap = {...fighter, coord: 1, heroId:'42', name:'fooFighter'};
  expect (
    fighterOnMap
  ).toStrictEqual(
    LEVEL_2_FIGHTER
  )
});

test ('level up fighter to level 2', () => {
  const fighter = profession(1, profTypes.fighter, () => '42');
  const fighterOnMap = {...fighter, coord: 1, heroId:'42', name:'fooFighter'};
  const fighter2 = increaseLevel(1)(fighterOnMap)
  expect (
    fighter2
  ).toStrictEqual(
    LEVEL_2_FIGHTER
  );
});