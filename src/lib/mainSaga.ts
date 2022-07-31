import { take, fork, call, all, delay, select, cancel, race } from 'redux-saga/effects';
import { ENCOUNTER_BEGIN, ENCOUNTER_OUTCOME, FIGHT, SKILL, TALK } from '../rpg/singlePlayerTroll';
import { putAction } from '../util/putAction';

export function * mainSaga() {
  while (true) {
    const {payload:encounter} = yield take(ENCOUNTER_BEGIN);

    console.log('-- ENCOUNTER :: ', encounter);

    yield putAction(ENCOUNTER_OUTCOME, ['--- over ---'])
  }
};
