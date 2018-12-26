import {IEventSetRoomsPlayersName, IEventSetRoomState} from '@src/common/socketEventClient';
import {ENUM_PIECES_MOVE, IOptionGame} from '@src/common/IType';

enum EnumAction {
  ON_SET_ROOM_STATE,
  ON_SET_ROOMS_PLAYERS_NAME,
  PIECE_MOVE,
  SEND_START_GAME,
  SEND_UPDATE_OPTION_GAME,
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

// PIECE_MOVE

interface IPieceMove extends IAction {
  readonly type: EnumAction.PIECE_MOVE,
  readonly move: ENUM_PIECES_MOVE,
}

const PIECE_MOVE = (move: ENUM_PIECES_MOVE): IPieceMove => {
  return {
    type: EnumAction.PIECE_MOVE,
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

type ReduxAction = IOnSetRoomeState
  | IOnSetRoomesPlayersName
  | IPieceMove
  | ISendStartGame
  | ISendUpdateOptionGame;

export {
  EnumAction,
  ReduxAction,
  IOnSetRoomeState,
  ON_SET_ROOM_STATE,
  IOnSetRoomesPlayersName,
  ON_SET_ROOMS_PLAYERS_NAME,
  IPieceMove,
  PIECE_MOVE,
  ISendStartGame,
  SEND_START_GAME,
  ISendUpdateOptionGame,
  SEND_UPDATE_OPTION_GAME,
};
