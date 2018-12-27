import {ActionRoom, Game} from '@src/server/Game';

interface IActionRooms {
  roomName?: string,
  socketId?: string,

  actionRoom: ActionRoom
}

class RoomsManager {

  roomManagers: Game[];

  constructor() {
    this.roomManagers = [];
  }

  public dispatch = (action: IActionRooms): void => {
    this.dispatchMain(action);
    this.roomManagers = this.roomManagers.filter((r) => r.state.players.length > 0);
  };

  private dispatchMain = (action: IActionRooms): void => {

    const {roomName, socketId, actionRoom} = action;

    if (roomName !== undefined) {
      let room = this.roomManagers.find((r) => r.state.roomName === roomName);
      if (room === undefined) {
        room = new Game(roomName);
        this.roomManagers.push(room);
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

  };

}

export {RoomsManager};
