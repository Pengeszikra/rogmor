import { take, fork, call, all, delay, select, cancel, race } from 'redux-saga/effects';
import { 
  ENCOUNTER_RESULT, ENCOUNTER_BEGIN, ENCOUNTER_OUTCOME, FOCUS_ON, 
  GameMode, HEART_BEAT, MainState, PLAY_ACTION, PLAY_FLOW, 
  PLAY_OUTCOME, SETUP_ENTITIES, SET_AUTO_FIGHT, SET_GAME_STATE, 
  SET_MOB_LIST, USER_ACT, USE_SKILL, LEVEL_UP_HERO } from '../rpg/singlePlayerTroll';
import { putAction } from '../util/putAction';
import { Mob, Team, ProfessionKey, mobFactory, traitsFactory } from '../rpg/profession';
import { improved, dice, pickOne, uid } from '../rpg/rpg';
import { slashParse, slashImprovedParser, SlashObject, getSkillResult, skillReducer, actionOrder} from 'src/rpg/slash';
import { isCapableToAction } from '../rpg/slash';

const slash = p => p;

const BATTLE_SPEED = 222;

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
  'chaosKnight': ['instant target-rnd hit-soul power-1; instant target-rnd hit-body power-1; instant target-rnd hit-aura power-1','fill-3 target hit-body power-4','fill-4 target-all hit-soul power-2'],
  'bishop': ['instant target-ally heal; instant target-rnd hit-body', 'instant target hit-soul power-2','fill-3 tsa heal-2','fill-4 target-all-ally heal-3'],
  'icelander': ['instant target-all hit-body','fill-3 target-all hit-body power-2','fill-4 target-rnd hit-body power-4'],
  'ninja': ['instant target hit-body power-[2.4]','fill-4 target-all hit-body power-2','fill-2 target hit-body power-4'],
  'samurai': ['instant target hit-body power-2','fill-2 target hit-body power-4','fill-4 target-all hit-body power-2'],
  'merchant': ['instant target hit-aura; instant target-rnd hit-soul power-2','fill-2 target hit-aura power-2','fill-4 target-all hit-aura'],
};

const getSkillObject = (m:Mob):Partial<SlashObject>[][] => skillForProf[m.professionType].map(slashImprovedParser);

export function * combatZoneSaga() {
  while (true) {
    yield take(ENCOUNTER_BEGIN);

    const {hero}:MainState = yield select();

    const pickProf = () => pickOne(Object.keys(skillForProf))

    const testTeams = [
      [hero.level, pickProf(), Team.BAD, dice(100)],
      [hero.level, pickProf(), Team.BAD, dice(100)],
      [hero.level, pickProf(), Team.BAD, dice(100)],
      
      [hero.level, pickProf(), Team.GOOD, dice(100)],
      [hero.level, hero.professionType, Team.GOOD, hero.avatar],
      [hero.level, pickProf(), Team.GOOD, dice(100)],
    ]
    
    const combatSetupMobList = testTeams.map(([lvl, type, team, avatar]:[number, ProfessionKey, Team, number]) => 
      makeMob(lvl, type, team, avatar)
    );

    yield putAction(SET_MOB_LIST, combatSetupMobList)
    let mobList = combatSetupMobList;

    _CombatIsOver_: while (true) {
      const order = actionOrder(mobList);

      while (order.length) {
        const [actor]:OrderOfSeed = order.shift();
        yield putAction(PLAY_FLOW, {who: actor.uid});
        const skillList = getSkillObject(actor);

        // mob always use A1
        const {isAutoFight} = yield select();
        const subList= yield call(userChiceTheSkillSaga, skillList, actor, isAutoFight)
        // console.log(subList, actor);

        _NextActor_: while (true) {
          if (subList.length < 1) break _NextActor_;

          const [, command] = yield race([
            delay(BATTLE_SPEED),
            take([HEART_BEAT, ENCOUNTER_OUTCOME]),
          ])

          if (command?.type === ENCOUNTER_OUTCOME) break _CombatIsOver_;

          const skill = subList.shift();
          const [aiTargetting, skillResult] = getSkillResult(actor, skill, mobList);
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
            break _CombatIsOver_;
          }
        }
      }
    }
    yield call(calculateEncounterResultSaga, mobList);
  }
}

function * userChiceTheSkillSaga(skillList:Partial<SlashObject>[][], actor:Mob, isAutoFight: boolean) {
  if (actor.team !== Team.GOOD || isAutoFight) return skillList.at(0)
  const {payload: skillIndex} = yield take([USE_SKILL, SET_AUTO_FIGHT]);
  return skillList.at(skillIndex);
}

function * calculateEncounterResultSaga(mobList:Mob[]) {
  yield putAction(SET_MOB_LIST, []);
  yield putAction(ENCOUNTER_RESULT, mobList);
  yield putAction(LEVEL_UP_HERO, 1);
}