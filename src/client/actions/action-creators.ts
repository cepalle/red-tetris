import {IEventSetRoomsPlayersName, IEventSetRoomState} from '@src/common/socketEventClient';
import {ENUM_PIECES_MOVE} from '@src/common/grid-piece-handler';
import {IOptionGame} from '@src/common/ITypeRoomManager';

enum EnumAction {
  ON_SET_ROOM_STATE,
  ON_SET_ROOMS_PLAYERS_NAME,
  SEND_START_GAME,
  SEND_UPDATE_OPTION_GAME,
  SEND_MOVE_PIECE,
  SEND_ROOM_PLAYER_NAME,
}

interface IAction {
  readonly type: EnumAction
}

// ON_SET_ROOM_STATE

interface IOnSetRoomeState extends IAction {
  readonly type: EnumAction.ON_SET_ROOM_STATE
  readonly arg: IEventSetRoomState
}

const ON_SET_ROOM_STATE = (arg: IEventSetRoomState): IOnSetRoomeState => {
  return {
    type: EnumAction.ON_SET_ROOM_STATE,
    arg: arg,
  };
};

// ON_SET_ROOMS_PLAYERS_NAME

interface IOnSetRoomesPlayersName extends IAction {
  readonly type: EnumAction.ON_SET_ROOMS_PLAYERS_NAME
  readonly arg: IEventSetRoomsPlayersName
}

const ON_SET_ROOMS_PLAYERS_NAME = (arg: IEventSetRoomsPlayersName): IOnSetRoomesPlayersName => {
  return {
    type: EnumAction.ON_SET_ROOMS_PLAYERS_NAME,
    arg: arg,
  };
};

// SEND_MOVE_PIECE

interface ISendMovePiece extends IAction {
  readonly type: EnumAction.SEND_MOVE_PIECE,
  readonly move: ENUM_PIECES_MOVE,
}

const SEND_MOVE_PIECE = (move: ENUM_PIECES_MOVE): ISendMovePiece => {
  return {
    type: EnumAction.SEND_MOVE_PIECE,
    move,
  };
};

// SEND_START_GAME

interface ISendStartGame extends IAction {
  readonly type: EnumAction.SEND_START_GAME,
}

const SEND_START_GAME = (): ISendStartGame => {
  return {
    type: EnumAction.SEND_START_GAME,
  };
};

// SEND_UPDATE_OPTION_GAME

interface ISendUpdateOptionGame extends IAction {
  readonly type: EnumAction.SEND_UPDATE_OPTION_GAME,
  readonly optionGame: IOptionGame,
}

const SEND_UPDATE_OPTION_GAME = (optionGame: IOptionGame): ISendUpdateOptionGame => {
  return {
    type: EnumAction.SEND_UPDATE_OPTION_GAME,
    optionGame,
  };
};

// SEND_ROOM_PLAYER_NAME

interface ISendRoomPlayerName {
  readonly type: EnumAction.SEND_ROOM_PLAYER_NAME,
}

const SEND_ROOM_PLAYER_NAME = (): ISendRoomPlayerName => {
  return {
    type: EnumAction.SEND_ROOM_PLAYER_NAME,
  };
};

type ReduxAction = IOnSetRoomeState
  | IOnSetRoomesPlayersName
  | ISendMovePiece
  | ISendStartGame
  | ISendUpdateOptionGame
  | ISendRoomPlayerName;

export {
  EnumAction,
  ReduxAction,
  IOnSetRoomeState,
  ON_SET_ROOM_STATE,
  IOnSetRoomesPlayersName,
  ON_SET_ROOMS_PLAYERS_NAME,
  ISendMovePiece,
  SEND_MOVE_PIECE,
  ISendStartGame,
  SEND_START_GAME,
  ISendUpdateOptionGame,
  SEND_UPDATE_OPTION_GAME,
  ISendRoomPlayerName,
  SEND_ROOM_PLAYER_NAME,
};
