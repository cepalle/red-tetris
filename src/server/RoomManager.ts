import {Socket} from 'socket.io';
import {ENUM_PIECES, IOptionGame, IPiece} from '@src/common/IType';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {IEventPlacePiece} from '@src/common/socketEventServer';
import {factPlayer} from '@src/server/playerUtils';

interface IPlayer {
  playerName: string;
  socket: Socket;
  isSpectator: boolean;
  grid: ENUM_PIECES[][];
  score: number;
  nbLineCompleted: number;
  win: boolean;
  lost: boolean;
  master: boolean;
  flow: IPiece[];
}

interface IRoomState {
  roomName: string;
  playing: boolean;
  players: IPlayer[];
  optionGame: IOptionGame;
}

class RoomManager {

  state: IRoomState;
  stateSub: BehaviorSubject<IRoomState>;

  constructor(roomName: string) {
    this.state = {
      roomName: roomName,
      players: [],
      playing: false,
      optionGame: {
        addWallLine: true,
        groundResizer: true,
      },
    };
    this.stateSub = new BehaviorSubject<IRoomState>(this.state);
  }

  public addPlayer(playerName: string, socket: Socket): void {
    const hasPlayerName = this.state.players.some((p) => p.playerName === playerName);
    if (hasPlayerName) {
      // TODO emit error
    }

    const hasSocket = this.state.players.some((p) => p.socket.id === socket.id);
    if (hasSocket) {
      // TODO
    }

    const isMaster = this.state.players.length === 0;
    this.updateState({
      ...this.state,
      players: [...this.state.players,
        factPlayer(playerName, socket, isMaster),
      ],
    });
  }

  public delPlayer(socket: Socket): void {
    if (this.state.players.some((p) => p.socket.id === socket.id)) {
      this.updateState({
        ...this.state,
        players: this.state.players.filter((p) => p.socket.id === socket.id),
      });
    }
  }

  public hasSock(socket: Socket) {
    return this.state.players.some((p) => p.socket.id === socket.id);
  }

  public updateOptionGame(optionGame: IOptionGame) {
    this.updateState({
      ...this.state,
      optionGame: optionGame,
    });
  }

  public startGame() {
    this.updateState({
      ...this.state,
      playing: true,
    });
  }

  public placePiece(socket: Socket, arg: IEventPlacePiece) {
    // const {piece, pos} = arg;
    // TODO
  }

  // Private

  private updateState(state: IRoomState) {
    this.state = state;
    this.stateSub.next(this.state);
  }

}

export {
  RoomManager,
  IPlayer,
  IRoomState,
};
