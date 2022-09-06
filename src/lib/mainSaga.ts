import { take, fork, call, all, delay, select, cancel, race } from 'redux-saga/effects';
import { ANIMATION_ENDED, ANIMATION_SKIPPED, ENCOUNTER_BEGIN, ENCOUNTER_OUTCOME, FIGHT, FOCUS_ON, GameMode, HEART_BEAT, MainState, PLAY_ACTION, PLAY_FLOW, PLAY_OUTCOME, SETUP_ENTITIES, SET_GAME_STATE, SET_MOB_LIST, SKILL, TALK, USER_ACT } from '../rpg/singlePlayerTroll';
import { putAction } from '../util/putAction';
import { Mob, Team, ProfessionKey, mobFactory, traitsFactory } from '../rpg/profession';
// import { Encounter } from './mainSaga';
import { improved, dice, pickOne, uid } from '../rpg/rpg';
import { slashParse, SlashObject, getSkillResult, skillReducer, actionOrder} from 'src/rpg/slash';
import { isCapableToAction } from '../rpg/slash';

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
  `${prof} level:${lvl}`, avatar, 1, uid(), team, traitsFactory(lvl, prof)
);

const skillForProf:Partial<Record<ProfessionKey, string[]>> = {
  'chaosKnight': ['instant target-rnd hit-soul power-3','fill-3 target hit-body power-4','fill-4 target-all hit-soul power-2'],
  'bishop': ['instant target-ally heal', 'instant target hit-soul power-2','fill-3 tsa heal-2','fill-4 target-all-ally heal-1'],
  'icelander': ['instant target-all hit-body','fill-3 target-all hit-body','fill-4 target hit-body power-4'],
  'ninja': ['instant target hit-body power-[2.4]','fill-4 target-all hit-body power-2','fill-2 target hit-body power-4'],
  'samurai': ['instant target hit-body power-2','fill-2 target hit-body power-4','fill-4 target-all hit-body power-2'],
  'merchant': ['instant target hit-aura','fill-2 target hit-aura power-2','fill-4 target-all hit-aura'],
};

const getSkillObject = (m:Mob):Partial<SlashObject>[] => skillForProf[m.professionType].map(slashParse);

export function * combatZoneSaga() {
  while (true) {
    yield take(ENCOUNTER_BEGIN);

    const {hero}:MainState = yield select();

    const pickProf = () => pickOne(Object.keys(skillForProf))

    const testTeams = [
      [dice(30) + 10, pickProf(), Team.BAD, dice(100)],
      [dice(30) + 10, pickProf(), Team.BAD, dice(100)],
      [dice(30) + 10, pickProf(), Team.BAD, dice(100)],
      
      [dice(30) + 10, pickProf(), Team.GOOD, dice(100)],
      [dice(30) + 10, pickProf(), Team.GOOD, hero.avatar],
      [dice(30) + 10, pickProf(), Team.GOOD, dice(100)],
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
        // const {type} = yield take([HEART_BEAT, ENCOUNTER_OUTCOME]);
        const [, command] = yield race([
          delay(222),
          take([HEART_BEAT, ENCOUNTER_OUTCOME]),
        ])
        
        if (command?.type === ENCOUNTER_OUTCOME) {untilCombat = false; break;}

        const [actor]:OrderOfSeed = order.shift();
        // yield actor.uid; // mob on charge
        const skillList = getSkillObject(actor);
        const [currentSkill] = skillList; // mob always use A1
        // const currentSkill = pickOne(skillList); // mob always use A1
        console.log(currentSkill, actor)
        const [aiTargetting, skillResult] = getSkillResult(actor, currentSkill, mobList);
        yield putAction(PLAY_FLOW, aiTargetting);
        yield putAction(PLAY_FLOW, skillResult);
        mobList = yield call(skillReducer, mobList, skillResult);
        yield putAction(SET_MOB_LIST, mobList);

        const isTwoTeam = mobList
          .filter(isCapableToAction)
          .map(mob => mob.team)
          .find((item, _, arr) => arr.indexOf(item) !== 0)
        ;
        
        if(!isTwoTeam) {
          yield take([HEART_BEAT, ENCOUNTER_OUTCOME]);
          yield putAction(FOCUS_ON, null);
          untilCombat = false; break;
        }
      }
    }

    yield putAction(SET_MOB_LIST, [])
  }
}