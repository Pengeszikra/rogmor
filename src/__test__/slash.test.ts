import { oneLevelUp, increaseLevel, Mob, mobFactory, Team, traitsFactory, ProfessionKey } from "../rpg/profession";
import { improved, rnd, amount } from "../rpg/rpg";

const makeMob = (lvl:number, prof:ProfessionKey, team:Team = Team.GOOD) => mobFactory(
  `${prof} level:${lvl}`, 2, 1, `id:${prof}-${lvl}`, team, traitsFactory(lvl, prof)
);

const skillForProf:Partial<Record<ProfessionKey, string[]>> = {
  'assasin': ['instant target hit-body','fill-3 hit-body power-4','fill-4 target-all hit-soul power-2'],
  'bishop': ['instant target hit-soul power-2','fill-3 target-ally heal-2','fill-4 target-all-ally bless-body power-2'],
  'icelander': ['instant target hit-body power-2','fill-3 target-all hit-body','fill-4 target-rnd power-4'],
  'ninja': ['instant target hit-body power-2','fill-4 target-all hit-body power-2','fill-2 target hit-body stun-2 power-4'],
  'samurai': ['instant target hit-body power-2','fill-2 target hit-body power-4','fill-4 target-all hit-body power-2'],
  'merchant': ['instant target hit-body weak','fill-2 hit-popular power-2','fill-4 target-all bribe-2'],
};

const encounter = {
  mobList: [
    makeMob(5, 'assasin', Team.BAD),
    makeMob(6, 'bishop', Team.BAD),
    makeMob(5, 'icelander', Team.BAD),
    makeMob(4, 'ninja', Team.GOOD),
    makeMob(7, 'samurai', Team.GOOD),
    makeMob(4, 'merchant', Team.GOOD),
  ],
}

const slashPreParse = slashSource => slashSource.split(' ')
  .map(command => command.split('-'))
  .map(([c,m]) => m ? {c,m} : {c}) // c: command, m: modification
;

export enum Target {
  RANDOM_ENEMY,
  SELECTED_ENEMY,
  ALL_ENEMY,
  RANDOM_ALLY,
  SELECTED_ALLY,
  ALL_ALLY,
}

export enum HitType {
  BODY = 1, 
  SOUL = 2, 
  POPULAR = 4,
}

export const slashParse = slashSource => slashSource.split(' ')
  .map(command => {
    switch (command) {
      case 'instant': return {fill:0};
      case 'fill-2': return {fill:2};
      case 'fill-3': return {fill:3};
      case 'fill-4': return {fill:4};
      case 'fill-5': return {fill:5};
      case 'fill-6': return {fill:6};
      case 'target': return {target: Target.SELECTED_ENEMY};
      case 'target-all': return {target: Target.ALL_ENEMY};
      case 'target-rnd': return {target: Target.RANDOM_ENEMY};
      case 'target-rnd-ally': return {target: Target.RANDOM_ALLY};
      case 'target-ally': return {target: Target.SELECTED_ALLY};
      case 'target-all-ally': return {target: Target.ALL_ALLY};
      case 'hit-body': return {hit: HitType.BODY};
      case 'hit-soul': return {hit: HitType.SOUL};
      case 'hit-popular': return {hit: HitType.POPULAR};
      case 'hit-combat': return {hit: HitType.BODY | HitType.SOUL};
      case 'power-2': return {mul: 2};
      case 'power-3': return {mul: 3};
      case 'power-4': return {mul: 4};
      case 'weak': return {mul: .8};
      case 'weak-2': return {mul: .7};
      case 'weak-3': return {mul: .6};
      case 'weak-4': return {mul: .5};
      case 'heal': return {heal: 1};
      case 'heal-2': return {heal: 2};
      case 'heal-3': return {heal: 3};
      case 'heal-4': return {heal: 4};
      case 'stun': return {stun: 1};
      case 'stun-2': return {stun: 2};
      case 'stun-3': return {stun: 3};
      case 'stun-4': return {stun: 4};
      case 'bribe': return {bribe: 1};
      case 'bribe-2': return {bribe: 2};
      case 'bribe-3': return {bribe: 3};
      case 'bribe-4': return {bribe: 4};
      case 'bless-body': return {bless: HitType.BODY};
      case 'bless-soul': return {bless: HitType.SOUL};
      case 'bless-popular': return {bless: HitType.POPULAR};
      default: return {_ERROR_:command}
    }
  })
  .reduce((acu, item) => ({...acu, ...item}),{})
;

test ('samurai lvl 5', () => {
  expect (makeMob(5, 'samurai', Team.GOOD)).toMatchSnapshot();
});

test ('encounter setup', () => {
  expect (encounter).toMatchSnapshot();
});

test ('simple strike test', () => {  
  expect (
    slashPreParse('instant target hit-body power-2')
  ).toStrictEqual([
    {c:'instant'},
    {c:'target'},
    {c:'hit', m:'body'},
    {c:'power', m:'2'},
  ]);
});

test ('simple strike test', () => {  
  expect (
    slashParse('instant target hit-body power-2')
  ).toStrictEqual({
    fill:0,
    target: Target.SELECTED_ENEMY,
    hit: HitType.BODY,
    mul: 2,
  });
});

test ('search unexsist skill', () => {

  const skillList = encounter.mobList.map((hero:Mob) => skillForProf[hero.professionType]
    .map(slashParse)
  ).flat()
  
  expect (
    skillList.filter((skill:any) => skill._ERROR_)
  ).toStrictEqual(
    []
  );
});

const skillDescriptionBySlash = `
# simple strong strike
target
body-strike
power-2

target-all
body-strike
weak-2

fill-4 # need a four round to refill
target-2
soul-strike-4

fill-3
target-ally
soul-heal-2

fill-2
target-ally-all
reaction-shield-4

instant # this means ready for use instant
fill-4
target-random
soul-strike-percent-5

fill-6
body-sacrifice-5
target-ally-dead
resurrection
soul-heal-4
`;
