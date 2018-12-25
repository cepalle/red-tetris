import {ActionRoom, RoomManager} from '@src/server/RoomManager';

interface IActionRooms {
  roomName?: string,
  socketId?: string,

  actionRoom: ActionRoom
}

class RoomsManager {

  roomManagers: RoomManager[];

  constructor() {
    this.roomManagers = [];
  }

  // middelware ? clean room empty ?
  public dispatch(action: IActionRooms): void {

    const {roomName, socketId, actionRoom} = action;

    if (roomName !== undefined) {
      let room = this.roomManagers.find((r) => r.state.roomName === roomName);
      if (room === undefined) {
        room = new RoomManager(roomName);
      }

      room.dispatch(actionRoom);
      return;
    }

    if (socketId !== undefined) {
      this.roomManagers.forEach((r) => {
        if (r.hasSocketId(socketId)) {
          r.dispatch(actionRoom);
        }
      });
      return;
    }

  }

}

export {RoomsManager};
