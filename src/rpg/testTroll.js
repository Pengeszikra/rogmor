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
  MOD_ENTITI = action('mod-entiti')
;

export const gameReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_HERO: return {...state, hero: payload};
    case MOVE_HERO: return {...state, position: state.position |> payload};
    case SET_JOURNAL: return {...state, journal: payload};
    case SETUP_ENEMYS: return {...state, enemys: payload};
    case SETUP_ITEMS: return {...state, items: payload};
    case SET_FIGHT: return {...state, fight: payload};
    case INC_STEPP: return {...state, stepp:  state.stepp |> payload};
    case SET_GAME_STATE: return {...state, game: state.game |> payload};
    case RUN_AWAY: return {...state, underEscaping: payload};
    case SETUP_ENTITIES: return {...state, entities: payload};
    case MOD_ENTITI: {
      const {entities} = state;
      return entities[payload?.uid] 
        ? {...state, entities: {...entities, [uid]: payload} }
        : state;
    }
    default: return state;
  }
};