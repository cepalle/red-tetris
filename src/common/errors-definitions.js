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
  USER_ALREADY_IN_ROOM: {
    type: "USER_ALREADY_IN_ROOM",
    message: "An user with the same name is already in this room."
  },
  USER_NOT_IN_ROOM: {
    type: "USER_NOT_IN_ROOM",
    message: "User is not in the room."
  },
  USER_CANT_PLAY: {
    type: "USER_CANT_PLAY",
    message: "User can't play."
  },
  USER_NOT_MASTER: {
    type: "USER_NOT_MASTER",
    message: "User is not the master."
  },
  ROOM_NOT_IN_GAME: {
    type: "ROOM_NOT_IN_GAME",
    message: "The room is not in a game so can't be ended."
  }

};
