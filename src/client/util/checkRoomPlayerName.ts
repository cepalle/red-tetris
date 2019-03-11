const checkRoomPlayerName = (roomName: string | undefined, playerName: string | undefined): boolean => {
  if (roomName === undefined || playerName === undefined) {
    return false
  }

  if (roomName.length < 3 || playerName.length < 3) {
    return false;
  }
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < roomName.length; i++) {
    if (!letters.includes(roomName[i])) {
      return false;
    }
  }

  for (let i = 0; i < playerName.length; i++) {
    if (!letters.includes(playerName[i])) {
      return false;
    }
  }

  return true;
};

export {checkRoomPlayerName};
