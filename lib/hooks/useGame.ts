import INITIAL_STATE from '@lib/game/globals/INITIAL_STATE';
import _ from 'lodash';
import { useEffect, useRef, useReducer as useState } from 'react';
import gameReducer from '@lib/reducers/gameReducer';
import playWithAStar from '@lib/game/playWithAStar';
import hasPlays from '@lib/game/player/hasPlays';
import playWithGreedySearch from '@lib/game/playWithGreedySearch';
import { GAME_ACTIONS_TYPES } from '@lib/reducers/gameReducer/@types';
import { MAX_DRAW_ATTEMPTS } from '@lib/game/globals/SETTINGS';

const useGame = () => {
  const [game, dispatch] = useState(gameReducer, _.clone(INITIAL_STATE));
  console.log({game})

  const drawAttempts = useRef(0);

  useEffect(() => {
    if (!game.playing) return;
    if (game.round.over) return;

    if (!hasPlays(game.board, game[game.turn])) {
      if (drawAttempts.current > MAX_DRAW_ATTEMPTS) {
        dispatch({
          type: GAME_ACTIONS_TYPES.TOGGLE_TURN,
        });

        drawAttempts.current = 0;
        return;
      }

      dispatch({
        type: GAME_ACTIONS_TYPES.DRAW,
        payload: { playerId: game.turn },
      });
      drawAttempts.current += 1;
    }

    if (game.turn === 'enemy') {
      if (game.aiAlgorithm === 'A_STAR') {
        console.log({aStar: game})
        playWithAStar(game, dispatch);
        return;
      }
      console.log({greedy: game})
      playWithGreedySearch(game.enemy, game.board, dispatch);
      return;
    }
  }, [game]);

  return { game, dispatch };
};

export default useGame;
