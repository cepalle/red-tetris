import {ActionRoom, Game} from '@src/server/Game';

interface IActionRooms {
  roomName?: string,
  socketId?: string,

  actionRoom: ActionRoom
}

class GamesManager {

  games: Game[];

  constructor() {
    this.games = [];
  }

  public dispatch = (action: IActionRooms): void => {
    this.dispatchMain(action);

    this.games.forEach((g) => {
      if (g.nbPlayer() === 0) {
        g.unsubscribe();
      }
    });
    this.games = this.games.filter((r) => r.nbPlayer() > 0);
  };

  private dispatchMain = (action: IActionRooms): void => {

    const {roomName, socketId, actionRoom} = action;

    if (roomName !== undefined) {
      let room = this.games.find((r) => r.state.roomName === roomName);
      if (room === undefined) {
        room = new Game(roomName);
        this.games.push(room);
      }

      room.dispatch(actionRoom);
      return;
    }

    if (socketId !== undefined) {
      this.games.forEach((r) => {
        if (r.hasSocketId(socketId)) {
          r.dispatch(actionRoom);
        }
      });
      return;
    }

  };

}

export {GamesManager};
