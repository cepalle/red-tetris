import * as React from 'react';
import { InfoPanel } from './info-panel';
import { GridPlayer } from './grid-player';
import { Opponents } from './opponents';
import { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Dispatch } from "redux";
import { SEND_MOVE_PIECE } from "@src/client/redux/actions/action-creators";
import { ENUM_PIECES_MOVE } from "@src/common/grid-piece-handler";

const keySpace = 32;
const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyS = 83;
const keyC = 67;

export const keysHandler = (dispatch: Dispatch<any>) => (event: any) => {

  switch (event.keyCode) {
    case keyLeft:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.LEFT));
      break;

    case keyUp:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.ROT_RIGHT));
      break;

    case keyRight:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.RIGHT));
      break;

    case keyDown:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.DOWN));
      break;

    case keySpace:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.DROP));
      break;

    case keyS:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.SWITCH));
      break;

    case keyC:
      event.preventDefault();
      dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.SWITCH));
      break;
  }
};

export const Game = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const eventListner = keysHandler(dispatch);

    window.addEventListener(
      'keydown',
      eventListner,
      false,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        eventListner,
        false,
      );
    };
  });

  return (
    <div className={'column'}>
      <div className={'row center'}>
        <div className={'row color8 pad'}>
          <InfoPanel/>
          <GridPlayer/>
        </div>
      </div>
      <Opponents/>
    </div>
  );
};
