import DOMINOS from '@lib/game/globals/DOMINOS';

const INITIAL_STATE: Game = {
  initialHandSize: 13,
  playing: false,
  turn: 'player',
  dominos: DOMINOS,
  deck: DOMINOS,
  player: {
    hand: [],
    money: 0,
    type: 'player',
  },
  enemy: {
    hand: [],
    money: 0,
    type: 'enemy',
  },
  board: {
    boardDominos: [],
    edges: {
      start: null,
      end: null,
    },
  },
  aiAlgorithm: 'A_STAR',
  round: {
    quantity: 1,
    over: false,
    results: [],
  },
  winner: null,
};

Object.freeze(INITIAL_STATE);

export default INITIAL_STATE;
