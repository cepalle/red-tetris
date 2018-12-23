import {Socket} from 'socket.io';
import {
  IEventPlacePiece,
  IEventSetGameOption,
  IEventSetRoomPlayerName,
  IEventStartGame,
} from '@src/common/socketEventServer';
import {RoomManager} from '@src/server/RoomManager';

class RoomsManager {

  roomManagers: RoomManager[];

  constructor() {
    this.roomManagers = [];
  }

  public setRoomPlayerName(socket: Socket, arg: IEventSetRoomPlayerName): void {
    const {playerName, roomName} = arg;

    let room = this.roomManagers.find((r) => r.state.roomName === roomName);

    if (room === undefined) {
      room = new RoomManager(roomName);
      this.roomManagers.push(room);
    }

    room.addPlayer(playerName, socket);
  }

  public delSocket(socket: Socket): void {
    this.roomManagers.forEach((r) => r.delPlayer(socket));
  }

  public updateOptionGame(socket: Socket, arg: IEventSetGameOption): void {
    const roomWithSock = this.roomManagers.find((r) => r.hasSock(socket));
    if (roomWithSock === undefined) {
      return;
    }

    roomWithSock.updateOptionGame(arg.optionGame);
  }

  public startGame(socket: Socket, arg: IEventStartGame) {
    const roomWithSock = this.roomManagers.find((r) => r.hasSock(socket));
    if (roomWithSock === undefined) {
      return;
    }

    roomWithSock.startGame();
  }

  public placePiece(socket: Socket, arg: IEventPlacePiece) {
    const roomWithSock = this.roomManagers.find((r) => r.hasSock(socket));
    if (roomWithSock === undefined) {
      return;
    }

    roomWithSock.placePiece(socket, arg);
  }

}

export {RoomsManager};
