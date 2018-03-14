const isInUsers = (users, username) => {
  for (let i = 0; i < users.length;i++) {
    if (users[i].username === username) {
      return true;
    }
  }
  return false;
};

const isInPlayerStates = (playerStates, playerName) => {
  for (let i = 0; i < playerStates.length;i++) {
    if (playerStates[i].playerName === playerName) {
      return true;
    }
  }
  return false;
};

export {isInUsers, isInPlayerStates};
