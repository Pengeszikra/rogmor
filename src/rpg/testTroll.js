import {actionFactory, kebabToCamelCase} from 'react-troll';

export const [getActionsLookup, action] = actionFactory(kebabToCamelCase);

export const initialState = {
 hero : null,
 position : {x:7, y:8},
 journal : [],
 enemys : [],
 items : [],
 fight : null,
 stepp : 0,
 game : {isOver: false, play:0},
 underEscaping : false,
 entities: {},
};

export const 
  SET_HERO = action('set-hero'),
  MOVE_HERO = action('move-hero'),
  SET_JOURNAL =  action('set-journal'),
  SETUP_ENEMYS = action('setup-enemys'),
  SETUP_ITEMS = action('setup-items'),
  SET_FIGHT = action('set-fight'),
  INC_STEPP = action('inc-stepp'),
  SET_GAME_STATE = action('set-game-state'),
  RUN_AWAY = action('run-away'),
  SETUP_ENTITIES = action('setup-entities'),
  ADD_ENTITI = action('add-entiti'),
  REMOVE_ENTITI = action('remove-entiti'),
  MOD_ENTITI = action('mod-entiti'),
  MOD_ENEMY = action('mod-enemy')
;

export const gameReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_HERO: return {...state, hero: payload};
    case MOVE_HERO: return {...state, position: payload(state.position)};
    case SET_JOURNAL: return {...state, journal: payload};
    case SETUP_ENEMYS: return {...state, enemys: payload};
    case SETUP_ITEMS: return {...state, items: payload};
    case SET_FIGHT: return {...state, fight: payload};
    case INC_STEPP: return {...state, stepp: payload(state.stepp)};
    case SET_GAME_STATE: return {...state, game: payload(state.game)};
    case RUN_AWAY: return {...state, underEscaping: payload};
    case SETUP_ENTITIES: return {...state, entities: payload};
    case MOD_ENEMY: {
      console.log(payload)
      const {uid} = payload;
      const enemys = state.enemys.map(enemy => (enemy?.uid === uid ? payload : enemy))
      return {...state, enemys};
    }
    case MOD_ENTITI: {
      const {entities} = state;
      return entities[payload?.uid] 
        ? {...state, entities: {...entities, [payload?.uid]: payload} }
        : state;
    }
    default: return state;
  }
};