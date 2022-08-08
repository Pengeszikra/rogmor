import { take, fork, call, all, delay, select, cancel, race } from 'redux-saga/effects';
import { ANIMATION_ENDED, ANIMATION_SKIPPED, ENCOUNTER_BEGIN, ENCOUNTER_OUTCOME, FIGHT, PLAY_ACTION, PLAY_OUTCOME, SKILL, TALK, USER_ACT } from '../rpg/singlePlayerTroll';
import { putAction } from '../util/putAction';
import { Mob, Team } from '../rpg/profession';
// import { Encounter } from './mainSaga';
import { improved } from '../rpg/rpg';

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

export const actionOrder = (mobList:Mob[]) => mobList
  .map(entiti => [entiti, improved(entiti.ability.reaction + (entiti.condition.staminaState / 10))])
  .sort(([a, aSpeed],[b, bSpeed]) => aSpeed > bSpeed ? 1 : -1 )
;

const turnGoesTo = (encounter:Encounter) => {
  const {mobList} = encounter;
  const [first] = actionOrder(mobList);
  return first;
}

export enum Outcome { ENDED };
export type OutcomeList = Outcome[];

export function * mainSaga() {
  // yield all([
  //   fork(encounterRulerSaga),
  // ]);
};

// function * encounterRulerSaga() {
//   while (true) {
//     const {payload:encounter} = yield take(ENCOUNTER_BEGIN);
//     const encounterTask = yield fork(encounterSaga, encounter);
//     yield take(ENCOUNTER_OUTCOME);
//     yield cancel(encounterTask);
//   }
// }
// 
// export function * encounterSaga (encounter:Encounter) {
//   while(true) {
//     const [activeMob,speed]:[Mob] = turnGoesTo(encounter);
//     const {payload:act} = activeMob.team === Team.PLAYER
//       ? yield take(USER_ACT)
//       : yield call(npcActSaga, encounter);
//     ;
//     const outcome:OutcomeList = yield call(playTurnSaga, encounter);
//     yield putAction(PLAY_ACTION, act);
//     yield putAction(PLAY_OUTCOME, outcome);
//     yield take([ANIMATION_ENDED, ANIMATION_SKIPPED]);
// 
//     
//   }
// }

export function * npcActSaga(encounter:Encounter) {
  
}

export function * playTurnSaga(encounter:Encounter) {
  return [Outcome.ENDED];
}
