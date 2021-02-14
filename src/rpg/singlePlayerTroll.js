import {actionFactory, kebabToCamelCase} from 'react-troll';

export const [getActionsLookup, action] = actionFactory(kebabToCamelCase);

export const initialState = {
 round : 0,
 hero: null,
 game: {},
 entities: {},
};

export const 
  SET_HERO = action('set-hero'),
  NEXT_ROUND = action('next-round'),
  SET_GAME_STATE = action('set-game-state'),
  SETUP_ENTITIES = action('setup-entities'),
  ADD_ENTITI = action('add-entiti'),
  REMOVE_ENTITI = action('remove-entiti'),
  MOD_ENTITI = action('mod-entiti')
;

export const gameReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_HERO: return {...state, hero: payload};
    case NEXT_ROUND: return {...state, round:  state.round |> payload};
    case SET_GAME_STATE: return {...state, game: state.game |> payload};
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