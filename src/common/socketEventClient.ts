// SET_ROOM_STATE
import {IOptionGame} from '@src/common/ITypeRoomManager';
import {ENUM_PIECES, IPiece, IPos} from '@src/common/grid-piece-handler';

interface IPlayerClient {
  playerName: string;
  isSpectator: boolean;
  grid: ENUM_PIECES[][];
  score: number;
  nbLineCompleted: number;
  playing: boolean;
  win: boolean;
  lost: boolean;
  flow: IPiece[];
  posPiece: IPos;
  isMaster: boolean;
}

interface IRoomStateClient {
  roomName: string;
  playing: boolean;
  players: IPlayerClient[];
  optionGame: IOptionGame;
}

interface IEventClientSetRoomState {
  room: IRoomStateClient
}

// SET_ROOMS_PLAYERS_NAME
interface IRoomPlayersName {
  roomName: string,
  playerNames: string[],
}

interface IEventClientSetRoomsPlayersName {
  roomsPlayersName: IRoomPlayersName[]
}

// ---

enum ENUM_SOCKET_EVENT_CLIENT {
  SET_ROOM_STATE = 'SET_ROOM_STATE',
  SET_ROOMS_PLAYERS_NAME = 'SET_ROOMS_PLAYERS_NAME',
}

export {
  ENUM_SOCKET_EVENT_CLIENT,
  IEventClientSetRoomState,
  IEventClientSetRoomsPlayersName,
  IRoomPlayersName,
  IRoomStateClient,
  IPlayerClient,
};
