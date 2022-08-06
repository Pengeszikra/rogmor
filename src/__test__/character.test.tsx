import { oneLevelUp, increaseLevel, Mob, mobFactory, Team, traitsFactory } from "../rpg/profession";

const fighter1Trait = traitsFactory(1, 'fighter');
const fighterMob:Mob = {...fighter1Trait, 
  name: 'Mr. Foo',
  coord: 0,
  avatar: 22,
  uid: 'dfx532',
  team: Team.BAD,
};

test ('create lvl 1 fighter', () => {  
  expect(fighter1Trait).toMatchSnapshot();
});


test ('Personalize lvl 1 fighter', () => {
  expect(fighterMob).toMatchSnapshot();
});

test ('Standard Personalize lvl 1 fighter', () => {
  const mobBymobFactory:Mob = mobFactory('Mr. Foo', 22, 0, 'dfx532', Team.BAD, fighter1Trait)
  expect(mobBymobFactory).toStrictEqual(fighterMob); 
});

test ('Level Up to fighter 2', () => {
  const MrFooLevel2 = increaseLevel(1)(fighterMob);
  expect(MrFooLevel2).toMatchSnapshot();
});

test ('Level Up to fighter 2 standard', () => {
  const mrFooLevel2 = increaseLevel(1)(fighterMob);
  const mrFooLevel2v2 = oneLevelUp(fighterMob);
  expect(mrFooLevel2).toStrictEqual(mrFooLevel2v2);
});

