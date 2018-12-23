enum ENUM_ERROR {
  UNEXPECTED_DATA = 'An unknown data can not be processed.',
  ROOM_EXIST = 'Game already exist.',
  ROOM_NOT_EXIST = 'Game not exist.',
  ROOM_ALREADY_IN_GAME = 'Game is already in game.',
  PLAYER_ALREADY_IN_ROOM = 'An player with the same name is already in this room.',
  PLAYER_NOT_IN_ROOM = 'Player is not in the room.',
  PLAYER_CANT_PLAY = 'Player can\'t play.',
  PLAYER_NOT_MASTER = 'Player is not the master.',
  ROOM_NOT_IN_GAME = 'The room is not in a game so can\'t be ended.',
}

export {ENUM_ERROR};
