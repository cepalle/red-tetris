const addPartsFlow = arg => {
  return {
    type: 'ADD_PARTS_FLOW',
    data: arg
  };
};

const addError = arg => {
  return {
    type: 'ADD_ERROR',
    data: arg
  }
};

const updateUsers = arg => {
  return {
    type: 'UPDATE_USERS',
    data: arg
  }
};

const movePart = arg => {
  return {
    type: 'MOVE_PART',
    data: arg
  }
};

const updateGrid = arg => {
  return {
    type: 'UPDATE_GRID',
    data: arg
  }
};

export {addPartsFlow, addError, updateUsers, movePart, updateGrid};
