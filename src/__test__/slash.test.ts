import { oneLevelUp, increaseLevel, Mob, mobFactory, Team, traitsFactory, ProfessionKey } from "../rpg/profession";
import { improved, rnd, pickOne } from "../rpg/rpg";

const makeMob = (lvl:number, prof:ProfessionKey, team:Team = Team.GOOD) => mobFactory(
  `${prof} level:${lvl}`, 2, 1, `id:${prof}-${lvl}`, team, traitsFactory(lvl, prof)
);

const skillForProf:Partial<Record<ProfessionKey, string[]>> = {
  'assasin': ['instant target hit-body','fill-3 hit-body power-4','fill-4 target-all hit-soul power-2'],
  'bishop': ['instant target hit-soul power-2','f-3 tsa heal-2','fill-4 target-all-ally bless-body power-2'],
  'icelander': ['instant target-all hit-body','fill-3 target-all hit-body','fill-4 target-rnd power-4'],
  'ninja': ['instant target hit-body power-[2.4]','fill-4 target-all hit-body power-2','fill-2 target hit-body stun-2 power-4'],
  'samurai': ['instant target hit-body power-2','fill-2 target hit-body power-4','fill-4 target-all hit-body power-2'],
  'merchant': ['instant target hit-body weak','fill-2 hit-popular power-2','fill-4 target-all bribe-2'],
};

const getSkillObject = (m:Mob):Partial<SlashObject>[] => skillForProf[m.professionType].map(slashParse);

const testTeams = [
  [5, 'icelander', Team.BAD],
  [6, 'bishop', Team.BAD],
  [5, 'assasin', Team.BAD],
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

export const actionOrder = (mobList) => mobList
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
  select: Target;
  doit: Doit;
  type: HitType;
  mul: number;
  score: number;
  extra: string;
  _ERROR_: string;
}

export type SlashParser = (source:string) => Partial<SlashObject>;

const slashCustomParse:SlashParser = command => {
  const baseCommand = command.split('-[')[0];
  const numeric = command.match(/-\[([\d|\.]+)\]/)?.[1];
  const words = command.match(/-\[([\d|a-z|A-Z|\.]+)\]/)?.[1];
  if (numeric) {
    switch (baseCommand) {
      case 'power': return {mul: + numeric};
      case 'weak': return {mul: + numeric};
    }
  } 
  else 
  if (words) {
    switch (baseCommand) {
      case 'extra': return {extra: words};
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
      case 'hit-body': case 'hb': return {doit:Doit.HIT, type: HitType.BODY, mul: 1};
      case 'hit-soul': case 'hs': return {doit:Doit.HIT, type: HitType.SOUL, mul: 1};
      case 'hit-popular': case 'hp': return {doit:Doit.HIT, type: HitType.POPULAR, mul: 1};
      case 'hit-combat': case 'hc': return {doit:Doit.HIT, type: HitType.BODY | HitType.SOUL, mul: 1};
      case 'power': case 'power-1': case 'p-1': return {mul: 1};
      case 'power-2': case 'p-2': return {mul: 2};
      case 'power-3': case 'p-3': return {mul: 3};
      case 'power-4': case 'p-4': return {mul: 4};
      case 'weak': case 'w': return {mul: .9};
      case 'weak-1': case 'w-1': return {mul: .8};
      case 'weak-2': case 'w-2': return {mul: .7};
      case 'weak-3': case 'w-3': return {mul: .6};
      case 'weak-4': case 'w-4': return {mul: .5};
      case 'heal': return {doit:Doit.HEAL, mul: 1};
      case 'heal-2': return {doit:Doit.HEAL, mul: 2};
      case 'heal-3': return {doit:Doit.HEAL, mul: 3};
      case 'heal-4': return {doit:Doit.HEAL, mul: 4};
      case 'stun': return {doit: Doit.STUN , mul:1};
      case 'stun-2': return {doit: Doit.STUN , mul:2};
      case 'stun-3': return {doit: Doit.STUN , mul:3};
      case 'stun-4': return {doit: Doit.STUN , mul:4};
      case 'bribe': return {doit:Doit.BRIBE, mul: 1};
      case 'bribe-2': return {doit:Doit.BRIBE, mul: 2};
      case 'bribe-3': return {doit:Doit.BRIBE, mul: 3};
      case 'bribe-4': return {doit:Doit.BRIBE, mul: 4};
      case 'bless-body': return {doit:Doit.BLESS, mul:1, type: HitType.BODY};
      case 'bless-soul': return {doit:Doit.BLESS, mul:1, type: HitType.SOUL};
      case 'bless-popular': return {doit:Doit.BLESS, mul:1, type: HitType.POPULAR};
      case 'ressurection': return {doit:Doit.RESSURECT};
      case 'shield-body': return {doit:Doit.SHIELD, type: HitType.BODY, mul: 1};
      case 'shield-soul': return {doit:Doit.SHIELD, type: HitType.SOUL, mul: 1};
      case 'shield-popular': return {doit:Doit.SHIELD, type: HitType.POPULAR, mul: 1};
      case 'shield-reaction': return {doit:Doit.SHIELD, type: HitType.REACTION, mul: 1};
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

export enum Doit {
  SELECT, TARGET, HIT, HEAL, BLESS, RESSURECT, SHIELD, STUN, DIE, BRIBE,
}

export type TargetMobId = string;

export type AmountCause = number;
export type AmountReach = number;
export interface Condition {
  staminaState: number;
  willState: number;
  joyfulState: number;
}

export type AmountItem = [TargetMobId, AmountCause, AmountReach, Condition];

export interface FlowAction {
  who: TargetMobId;
  doit: Doit;
  type?: HitType;
  select?: Target;
  target?: TargetMobId[];
  amount?: AmountItem[];
}

const selectByWeakest:FlowAction = {
  who: '22',
  doit: Doit.TARGET,
  select: Target.SELECTED_ENEMY,
  target: ['13'],
}

const strikeTheWeakest:FlowAction = {
  who: '22',
  doit: Doit.HIT,
  type: HitType.BODY,
  target: ['13'],
  amount:  [['13', 234, 344, {staminaState: 344, joyfulState: 444, willState: 555}]]
}

const strikeAll:FlowAction = {
  who: '22',
  doit: Doit.HIT,
  type: HitType.BODY,
  target: ['13','48','11'],
  amount: [
    ['13', 234, 344, {staminaState: 344, joyfulState: 444, willState: 555}], 
    ['48', 234, 423, {staminaState: 423, joyfulState: 444, willState: 555}], 
    ['11', 234, 112, {staminaState: 112, joyfulState: 444, willState: 555}] 
  ]
}

const someOneDie:FlowAction = {
  who: '22',
  doit: Doit.DIE,
  target: ['13'],
}


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
    slashParse('i target hb power-[2.4] extra-[teleport]')
  ).toStrictEqual({
    fill:0,
    select: Target.SELECTED_ENEMY,
    type: HitType.BODY,
    doit: Doit.HIT,
    mul: 2.4,
    extra: 'teleport',
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

export const aiTarget = (actor:Mob, actorSkill:Partial<SlashObject>, mobList:Mob[]):FlowAction => {
  
  const {team:actorTeam} = actor;
  const seekEnemy = ({team}) => team !== actorTeam;
  const selectUid = ({uid}) => uid;
  const getAffinity = ({condition:{staminaState, willState, joyfulState}}:Partial<Mob>) => {
    switch(actorSkill?.type) {
      case HitType.BODY: return staminaState;
      case HitType.SOUL: return willState;
      case HitType.POPULAR: return joyfulState;
      case HitType.REACTION: return staminaState + willState;
    }
  }
  const weakByAffinity = (a:Mob, b:Mob) => getAffinity(a) > getAffinity(b) ? 1 : -1;
  const matchTarget = (select:Target, type:HitType) => {
    switch(select) {
      case Target.SELECTED_ENEMY: return mobList
        .filter(seekEnemy)
        .sort(weakByAffinity)
        .map(selectUid)
        .slice(0,1)
      ;
      case Target.ALL_ENEMY: return mobList.filter(seekEnemy).map(selectUid);
      case Target.RANDOM_ENEMY: return pickOne(mobList.filter(seekEnemy));
    }
  };
  
  const target:TargetMobId[] = matchTarget(actorSkill?.select, actorSkill?.type);
  
  return {
    who: actor.uid,
    doit: Doit.TARGET,
    select: actorSkill?.select,
    target
  };
}

export const calcHit = (actor:Mob, target:Mob, actorSkill:Partial<SlashObject>):AmountItem => {

  switch(actorSkill?.type) {
    case HitType.BODY: {
      const dmg:number = Math.min(improved(actor.ability.body / 2 * actorSkill.mul), target.condition.staminaState);
      const left:number = target.condition.staminaState - dmg;
      return [target.uid, - dmg, left, {...target.condition, staminaState: left}];
    };
    case HitType.SOUL: {
      const dmg:number = Math.min(improved(actor.ability.soul / 2 * actorSkill.mul), target.condition.willState);
      const left:number = target.condition.willState - dmg;
      return [target.uid, - dmg, left, {...target.condition, willState: left}];
    }
    case HitType.POPULAR: {
      const dmg:number = Math.min(improved(actor.ability.popular / 2 * actorSkill.mul), target.condition.joyfulState);
      const left:number = target.condition.joyfulState - dmg;
      return [target.uid, - dmg, left, {...target.condition, joyfulState: left}];
    }

    case HitType.REACTION: {
      const dmg:number = Math.min(improved(actor.ability.reaction / 2 * actorSkill.mul), target.condition.staminaState);
      const left:number = target.condition.staminaState - dmg;
      return [target.uid, - dmg, left, {...target.condition, staminaState: left}];
    }
  }
}

export const calcResult = (actor:Mob, actorSkill:Partial<SlashObject>, mobList:Mob[], targetting:FlowAction):FlowAction => {
  const {doit, type } = actorSkill;
  const {who, target} = targetting;
  const amount:AmountItem[] = target.map(
    (enemyId:TargetMobId) => calcHit(actor, mobList.find(({uid}) => uid === enemyId), actorSkill)
  );
  return {
    who,
    doit,
    type,
    target,
    amount,
  }
}

export const getSkillResult = (actor:Mob, actorSkill:Partial<SlashObject>, mobList:Mob[]):FlowAction[] => {
  
  const targetting:FlowAction = aiTarget(actor, actorSkill, mobList);

  const result:FlowAction = calcResult(actor, actorSkill, mobList, targetting);

  return [targetting, result];
}

export const skillReducer = (mobList:Mob[], result:FlowAction):Mob[] => {
  switch (result.doit) {
    case Doit.HIT: {
      const affectedMobList:Mob[] = result.amount
        .map(([id, dmg, left, condition]) => {
          const mob = mobList.find(({uid}) => uid === id);
          return [mob, condition];
        })
        .map(([mob, condition]:[Mob, Condition]) => {
          return [mob, condition];
        })
        .map(([mob, condition]:[Mob, Condition]) => ({...mob, condition}));

      return mobList.map(mob => {
        const affected:Mob = affectedMobList.find((m:Mob) => m.uid === mob.uid);
        if (!affected) return mob
        return affected 
      });
    }
    default: mobList;
  }
}

export function * combatFlowSaga(mobList:Mob[]):any {
  while (true) {
    const order = actionOrder(mobList);
    yield order;
    while (order.length) {
      const [actor]:[Mob] = order.shift();
      yield actor.uid;
      const skillList = getSkillObject(actor);
      yield skillList;
      const [A1] = skillList;
      const [aiTargetting, skillResult] = getSkillResult(actor, A1, mobList);
      mobList = skillReducer(mobList, skillResult);
      yield aiTargetting;
      yield skillResult;
    }
    // yield mobList.map((mob:Mob) => [mob.uid,mob.condition])
  }

}

describe ('combat flow by automatic fight', () => {

  const mobList = testTeams.map(([lvl, type, team]:[number, ProfessionKey, Team]) => makeMob(lvl, type, team));
  const flow = combatFlowSaga(mobList)
  const nextRound = (generator) => generator.next().value; 

  test('initial order', () => {
  
    expect ( 
      nextRound(flow).map(([m]:[Mob])=>[m.uid, m.condition])
    ).toStrictEqual(
      [
        ['id:samurai-7', {staminaState: 357, willState: 284, joyfulState: 210}],
        ['id:bishop-6', {staminaState: 174, willState: 228, joyfulState: 156}],
        ['id:icelander-5', {staminaState: 123, willState: 160, joyfulState: 110}],
        ['id:assasin-5', {staminaState: 123, willState: 148, joyfulState: 110}],
        ['id:ninja-4', {staminaState: 96, willState: 80, joyfulState: 72}],
        ['id:merchant-4', {staminaState: 96, willState: 112, joyfulState: 72}],
      ]
    );
  })

  test ('first is the samurai', () => {
    expect(nextRound(flow)).toStrictEqual('id:samurai-7');
  });

  test ('samurai skill object list is', () => {
    expect(nextRound(flow)).toMatchSnapshot() 
  });

  test ('samurai select one enemy for A1', () => {
    expect(nextRound(flow)).toStrictEqual(
      {
        who: 'id:samurai-7',
        doit: Doit.TARGET,
        select: Target.SELECTED_ENEMY,
        target: ['id:assasin-5'],
      } as FlowAction
    )
  });

  test ('samurai hit weakest enemy', () => {
    expect(nextRound(flow)).toStrictEqual(
      {
        who: 'id:samurai-7',
        doit: Doit.HIT,
        type: HitType.BODY,
        target: ['id:assasin-5'],
        amount: [['id:assasin-5', -49, 74, {staminaState: 74, joyfulState: 110, willState: 148}]],
      } as FlowAction
    )
  });

  test ('samurai A2 and A3 fiiled up bye one', () => {});

  test ('next one is the bishop', () => {
    expect (nextRound(flow)).toStrictEqual('id:bishop-6');
    nextRound(flow)
  });

  test ('bishop select one enemy for A1', () => {
    expect(nextRound(flow)).toStrictEqual(
      {
        who: 'id:bishop-6',
        doit: Doit.TARGET,
        select: Target.SELECTED_ENEMY,
        target: ['id:ninja-4'],
      } as FlowAction
    )
  });

  test ('bishop hit weakest enemy', () => {
    expect(nextRound(flow)).toStrictEqual(
      {
        who: 'id:bishop-6',
        doit: Doit.HIT,
        type: HitType.SOUL,
        target: ['id:ninja-4'],
        amount: [['id:ninja-4', -39, 41, {staminaState: 96, joyfulState: 72, willState: 41}]],
      } as FlowAction
    )
  });

  test ('next one is the icelander', () => {
    expect (nextRound(flow)).toStrictEqual('id:icelander-5');
    nextRound(flow)
  });

  test ('icelander select one enemy for A1', () => {
    expect(nextRound(flow)).toStrictEqual(
      {
        who: 'id:icelander-5',
        doit: Doit.TARGET,
        select: Target.ALL_ENEMY,
        target: [
          'id:ninja-4',  
          'id:samurai-7',
          'id:merchant-4',
        ],
      } as FlowAction
    )
  });

  test ('icelander hit all enemy', () => {
    expect(nextRound(flow)).toStrictEqual(
      {
        who: 'id:icelander-5',
        doit: Doit.HIT,
        type: HitType.BODY,
        target: [
          'id:ninja-4',
          'id:samurai-7',
          'id:merchant-4',
        ],
        amount: [
          ['id:ninja-4', -16, 80, {staminaState: 80, joyfulState: 72, willState: 41}],
          ['id:samurai-7', -16, 341, {staminaState: 341, joyfulState: 210, willState: 284}], 
          ['id:merchant-4', -16, 80, {staminaState: 80, joyfulState: 72, willState: 112}],
        ],
      } as FlowAction
    )
  });
  
  test ('end of the round', () => {
    Array(12).fill(1).forEach(() => nextRound(flow))
    expect (
      nextRound(flow).map(([m]:[Mob])=>[m.uid, m.condition])
    ).toStrictEqual(
      [
        ['id:samurai-7', {staminaState: 341, willState: 284, joyfulState: 210}],
        ['id:bishop-6', {staminaState: 174, willState: 228, joyfulState: 156}],
        ['id:icelander-5', {staminaState: 123, willState: 160, joyfulState: 110}],
        ['id:assasin-5', {staminaState: 49, willState: 148, joyfulState: 110}],
        ['id:ninja-4', {staminaState: 80, willState: 41, joyfulState: 72}],
        ['id:merchant-4', {staminaState: 67, willState: 112, joyfulState: 72}],
      ]
    );
  });

  test ('end of the second', () => {
    Array(6 * 4).fill(1).forEach(() => nextRound(flow))
    expect (
      nextRound(flow).map(([m]:[Mob])=>[m.uid, m.condition])
    ).toStrictEqual(
      [
        ['id:samurai-7', {staminaState: 325, willState: 284, joyfulState: 210}],
        ['id:bishop-6', {staminaState: 174, willState: 228, joyfulState: 156}],
        ['id:icelander-5', {staminaState: 123, willState: 160, joyfulState: 110}],
        ['id:assasin-5', {staminaState: 0, willState: 148, joyfulState: 110}], // he is die
        ['id:merchant-4', {staminaState: 38, willState: 112, joyfulState: 72}],
        ['id:ninja-4', {staminaState: 64, willState: 2, joyfulState: 72}],
      ]
    );
  });

});

