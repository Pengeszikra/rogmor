import { oneLevelUp, increaseLevel, Mob, mobFactory, Team, traitsFactory, ProfessionKey } from "../rpg/profession";
import { improved, rnd, amount } from "../rpg/rpg";
import { call } from 'redux-saga/effects';

const makeMob = (lvl:number, prof:ProfessionKey, team:Team = Team.GOOD) => mobFactory(
  `${prof} level:${lvl}`, 2, 1, `id:${prof}-${lvl}`, team, traitsFactory(lvl, prof)
);

const skillForProf:Partial<Record<ProfessionKey, string[]>> = {
  'assasin': ['instant target hit-body','fill-3 hit-body power-4','fill-4 target-all hit-soul power-2'],
  'bishop': ['instant target hit-soul power-2','f-3 tsa heal-2','fill-4 target-all-ally bless-body power-2'],
  'icelander': ['instant target hit-body power-2','fill-3 target-all hit-body','fill-4 target-rnd power-4'],
  'ninja': ['instant target hit-body power-[2.4]','fill-4 target-all hit-body power-2','fill-2 target hit-body stun-2 power-4'],
  'samurai': ['instant target hit-body power-2','fill-2 target hit-body power-4','fill-4 target-all hit-body power-2'],
  'merchant': ['instant target hit-body weak','fill-2 hit-popular power-2','fill-4 target-all bribe-2'],
};

const getSkillObject = (m:Mob):Partial<SlashObject>[] => skillForProf[m.professionType].map(slashParse);

const testTeams = [
  [5, 'assasin', Team.BAD],
  [6, 'bishop', Team.BAD],
  [5, 'icelander', Team.BAD],
  [4, 'ninja', Team.GOOD],
  [7, 'samurai', Team.GOOD],
  [4, 'merchant', Team.GOOD],
]

const encounter = {
  mobList: testTeams.map(([lvl, type, team]:[number, ProfessionKey, Team]) => makeMob(lvl, type, team))
}

const slashPreParse = (slashSource:string) => slashSource.split(' ')
  .map(command => command.split('-'))
  .map(([c,m]) => m ? {c,m} : {c}) // c: command, m: modification
;

const actionOrder = (mobList) => mobList
  .map(mob => [mob, 
    improved(
      (
        mob.ability.reaction 
      + (mob.condition.staminaState / 10)
      + (mob.condition.willState / 10)
      ) / mob.level
    )])
  .sort(([a, aSpeed],[b, bSpeed]) => aSpeed > bSpeed ? -1 : 1 )
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
  REACTION = 8,
}

export interface SlashObject {
  fill: number;
  target: Target;
  hit: HitType;
  mul: number;
  heal: number;
  stun: number;
  bribe: number;
  ressurection:  Target;
  shield: HitType;
  shieldPower: number;
  score: number;
  spec: string;
  _ERROR_: string;
}

export type SlashParser = (source:string) => Partial<SlashObject>;

const slashCustomParse:SlashParser = command => {
  const baseCommand = command.split('-[')[0];
  const numeric = command.match(/-\[([\d|\.]+)\]/)?.[1];
  const custom = command.match(/-\[([\d|a-z|A-Z|\.]+)\]/)?.[1];
  if (numeric) {
    switch (baseCommand) {
      case 'power': return {mul: + numeric};
      case 'weak': return {mul: + numeric};
    }
  } 
  else 
  if (custom) {
    switch (baseCommand) {
      case 'spec': return {spec: custom};
    }
  }
  return {_ERROR_:command};
}

export const slashParse:SlashParser = slashSource => slashSource.split(' ')
  .map(command => {
    switch (command) {
      case 'instant': case 'i': return {fill:0};
      case 'fill-1': case 'f-1': return {fill:1};
      case 'fill-2': case 'f-2': return {fill:2};
      case 'fill-3': case 'f-3': return {fill:3};
      case 'fill-4': case 'f-4': return {fill:4};
      case 'fill-5': case 'f-5': return {fill:5};
      case 'fill-6': case 'f-6': return {fill:6};
      case 'target': case 'tse': return {select: Target.SELECTED_ENEMY};
      case 'target-all': case 'tae': return {select: Target.ALL_ENEMY};
      case 'target-rnd': case 'tre': return {select: Target.RANDOM_ENEMY};
      case 'target-rnd-ally': case 'tra': return {select: Target.RANDOM_ALLY};
      case 'target-ally': case 'tsa': return {select: Target.SELECTED_ALLY};
      case 'target-all-ally': case 'taa': return {select: Target.ALL_ALLY};
      case 'hit-body': case 'hb': return {hit: HitType.BODY};
      case 'hit-soul': case 'hs': return {hit: HitType.SOUL};
      case 'hit-popular': case 'hp': return {hit: HitType.POPULAR};
      case 'hit-combat': case 'hc': return {hit: HitType.BODY | HitType.SOUL};
      case 'power': case 'power-1': case 'p-1': return {mul: 1};
      case 'power-2': case 'p-2': return {mul: 2};
      case 'power-3': case 'p-3': return {mul: 3};
      case 'power-4': case 'p-4': return {mul: 4};
      case 'weak': case 'w': return {mul: .9};
      case 'weak-1': case 'w-1': return {mul: .8};
      case 'weak-2': case 'w-2': return {mul: .7};
      case 'weak-3': case 'w-3': return {mul: .6};
      case 'weak-4': case 'w-4': return {mul: .5};
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
      case 'ressurection': return {ressurection: Target.SELECTED_ALLY};
      case 'shield-body': return {shield: HitType.BODY, shieldPower: 1};
      case 'shield-soul': return {shield: HitType.SOUL, shieldPower: 1};
      case 'shield-popular': return {shield: HitType.POPULAR, shieldPower: 1};
      case 'shield-reaction': return {shield: HitType.REACTION, shieldPower: 1};
      case 'shield-1': return {shieldPower: 1};
      case 'shield-2': return {shieldPower: 2};
      case 'shield-3': return {shieldPower: 3};
      case 'shield-4': return {shieldPower: 4};
      case 'score-1': case 's-1': return {score:1};
      case 'score-2': case 's-2': return {score:2};
      case 'score-3': case 's-3': return {score:3};
      case 'score-4': case 's-4': return {score:4};
      case 'score-5': case 's-5': return {score:5};
      case 'score-6': case 's-6': return {score:6};
      default: return slashCustomParse(command);
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
    slashParse('i target hb power-[2.4] spec-[teleport]')
  ).toStrictEqual({
    fill:0,
    select: Target.SELECTED_ENEMY,
    hit: HitType.BODY,
    mul: 2.4,
    spec: 'teleport',
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

export function * combatFlowSaga(mobList:Mob[]):any {
  const order = actionOrder(mobList);
  yield order;
  const [actor]:[Mob] = order.shift();
  yield actor;
  const slashObject = getSkillObject(actor);
  yield slashObject;
}


describe ('combat round', () => {

  const mobList = testTeams.map(([lvl, type, team]:[number, ProfessionKey, Team]) => makeMob(lvl, type, team));
  const play = {mobList}
  const flow = combatFlowSaga(mobList)

  test('initial order', () => {
  
    expect ( 
      flow.next().value.map(([m])=>m.professionType)
    ).toStrictEqual(
      [
        'samurai',
        'bishop',
        'assasin',
        'icelander',
        'ninja',
        'merchant'
      ]
    );
  })

  test ('first is the samurai', () => {
    expect (
      flow.next().value
    ).toStrictEqual(
      mobList[4]
    );
  });

  test ('samurai skill object list is', () => {
    expect(flow.next().value).toMatchSnapshot() 
  });
});

