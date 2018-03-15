const addPartsFlow = data => {
  return {
    type: 'ADD_PARTS_FLOW',
    data: data
  };
};

const addError = er => {
  return {
    type: 'ADD_ERROR',
    data: er
  }
};

const updateUsers = users => {
  return {
    type: 'UPDATE_USERS',
    data: users
  }
};

const movePart = direction => {
  return {
    type: 'MOVE_PART',
    data: direction
  }
};

export {addPartsFlow, addError, updateUsers, movePart};
