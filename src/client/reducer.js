const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
};

export {reducer};
