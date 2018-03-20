
module.exports = {

  UNEXPECTED_DATA: {
    type: "UNEXPECTED_DATA",
    message: "An unknown data can not be processed."
  },
  ROOM_EXIST: {
    type: "ROOM_EXIST",
    message: "Room already exist."
  },
  ROOM_NOT_EXIST: {
    type: "ROOM_NOT_EXIST",
    message: "Room not exist."
  },
  ROOM_ALREADY_IN_GAME: {
    type: "ROOM_ALREADY_IN_GAME",
    message: "Room is already in game."
  },
  PLAYER_ALREADY_IN_ROOM: {
    type: "PLAYER_ALREADY_IN_ROOM",
    message: "An player with the same name is already in this room."
  },
  PLAYER_NOT_IN_ROOM: {
    type: "PLAYER_NOT_IN_ROOM",
    message: "Player is not in the room."
  },
  PLAYER_CANT_PLAY: {
    type: "PLAYER_CANT_PLAY",
    message: "Player can't play."
  },
  PLAYER_NOT_MASTER: {
    type: "PLAYER_NOT_MASTER",
    message: "Player is not the master."
  },
  ROOM_NOT_IN_GAME: {
    type: "ROOM_NOT_IN_GAME",
    message: "The room is not in a game so can't be ended."
  }

};
