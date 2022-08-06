import { oneLevelUp, increaseLevel, Mob, mobFactory, Team, traitsFactory, professionKeyList } from "../rpg/profession";
import { improved } from "../rpg/rpg";

const fighter1Trait = traitsFactory(1, 'fighter');
const fighterMob:Mob = {...fighter1Trait, 
  name: 'Mr. Foo',
  coord: 0,
  avatar: 22,
  uid: 'dfx532',
  team: Team.BAD,
};

const actionOrder = (mobList:Mob[]) => mobList
  .map(mob => [mob, improved(
      mob.ability.reaction 
      + (mob.condition.staminaState / 10) 
      + (mob.condition.willState / 15)
    )])
  .sort(([a, aSpeed],[b, bSpeed]) => aSpeed > bSpeed ? -1 : 1 )
;

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

test('order of speed', () => {
  const MrFooLevel2 = increaseLevel(10)(fighterMob);
  const list = [fighterMob, MrFooLevel2];
  const order = actionOrder(list);
  
  expect(order).toEqual([[MrFooLevel2, 203], [fighterMob, 3]])
})

test('speed order of different profession lvl 10', () => {
  //  const MrFooLevel2 = increaseLevel(10)(fighterMob);
  
  const list:Mob[] = professionKeyList.map(
    (key, index) => mobFactory(
      `Mr. ${key}`,
      7,
      0,
      index,
      Team.GOOD,
      traitsFactory(10, key)
    )
  )

  const order = actionOrder(list);
  
  expect(
    order.map(([mob, speed]:[Mob, number]) => `${mob.professionType}`)
  ).toMatchSnapshot();
})

