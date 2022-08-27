import { take, fork, call, all, delay, select, cancel, race } from 'redux-saga/effects';
import { ANIMATION_ENDED, ANIMATION_SKIPPED, ENCOUNTER_BEGIN, ENCOUNTER_OUTCOME, FIGHT, FOCUS_ON, GameMode, HEART_BEAT, MainState, PLAY_ACTION, PLAY_FLOW, PLAY_OUTCOME, SETUP_ENTITIES, SET_GAME_STATE, SET_MOB_LIST, SKILL, TALK, USER_ACT } from '../rpg/singlePlayerTroll';
import { putAction } from '../util/putAction';
import { Mob, Team, ProfessionKey, mobFactory, traitsFactory } from '../rpg/profession';
// import { Encounter } from './mainSaga';
import { improved, dice, pickOne } from '../rpg/rpg';
import { slashParse, SlashObject, getSkillResult, skillReducer, actionOrder} from 'src/rpg/slash';

const slash = p => p;

// export enum Phase {PREPARE, CHOICE, RESULT}

export interface Effect {
  id: string;
  type: string;
}
export interface Act {
  id: string;
  type: string;
  cooldown: number;
  tick: number;
  script: string;
}

const exampleAct:Act = {
  id: '1234',
  type: 'Strike',
  cooldown: 1,
  tick: 0,
  script: 'select-enemy body-strike',
}

export interface ActInstance {
  act: Act;
  actor: Mob;
  targetList: Mob[];
  timestamp?: number;
}

export interface Encounter {
  mobList: Mob[];
  actList: ActInstance[];
  targetList: Mob[];
  showTime: Effect[];
}

export type OrderOfSeed = [Mob, number];

export enum Outcome { ENDED };
export type OutcomeList = Outcome[];

export function * mainSaga() {
  yield all([
    fork(combatZoneSaga),
  ]);
};

const makeMob = (lvl:number, prof:ProfessionKey, team:Team = Team.GOOD, avatar) => mobFactory(
  `${prof} level:${lvl}`, avatar, 1, `id:${prof}-${lvl}`, team, traitsFactory(lvl, prof)
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

export function * combatZoneSaga() {
  while (true) {
    yield take(ENCOUNTER_BEGIN);

    const {hero}:MainState = yield select();

    const pickProf = () => pickOne(Object.keys(skillForProf))

    const testTeams = [
      [dice(7) + 2, pickProf(), Team.BAD, dice(100)],
      [dice(7) + 2, pickProf(), Team.BAD, dice(100)],
      [dice(7) + 2, pickProf(), Team.BAD, dice(100)],

      [dice(7) + 2, pickProf(), Team.GOOD, dice(100)],
      [dice(7) + 2, pickProf(), Team.GOOD, hero.avatar],
      [dice(7) + 2, pickProf(), Team.GOOD, dice(100)],
    ]
    
    const combatSetupMobList = testTeams.map(([lvl, type, team, avatar]:[number, ProfessionKey, Team, number]) => 
      makeMob(lvl, type, team, avatar)
    );

    yield putAction(SET_MOB_LIST, combatSetupMobList)
    let mobList = combatSetupMobList;

    let untilCombat = true;
    while (untilCombat) {
      const order = actionOrder(mobList);
      // yield order;
      while (order.length) {
        const {type} = yield take([HEART_BEAT, ENCOUNTER_OUTCOME]);
        
        if (type === ENCOUNTER_OUTCOME) {untilCombat = false; break;}

        const [actor]:OrderOfSeed = order.shift();
        // yield actor.uid; // mob on charge
        const skillList = getSkillObject(actor);
        const [A1] = skillList; // mob always use A1
        const [aiTargetting, skillResult] = getSkillResult(actor, A1, mobList);
        yield putAction(PLAY_FLOW, aiTargetting);
        // yield take(HEART_BEAT);
        yield putAction(PLAY_FLOW, skillResult);
        // yield take(HEART_BEAT);
        mobList = yield call(skillReducer, mobList, skillResult);
        yield putAction(SET_MOB_LIST, mobList);
      }
    }

    yield putAction(SET_MOB_LIST, [])
  }
}

export function * combatFlowSaga(mobList:Mob[]):any {
  while (true) {
    const order = actionOrder(mobList);
    yield order;
    while (order.length) {
      const [actor]:OrderOfSeed = order.shift();
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

// 55, 110, 110
