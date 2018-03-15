const isInUsers = (users, username) => {
  return users.filter(e => e.username === username).length > 0;
};

const isInPlayerStates = (playerStates, playerName) => {
  return playerStates.filter(e => e.playerName === playerName).length > 0;
};

export {isInUsers, isInPlayerStates};
