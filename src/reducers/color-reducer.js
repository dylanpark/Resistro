import * as actionConst from '../actions/action-const';

const initialState = {
  output: {},
  error: null,
  fetched: false
}

function colorReducer(state={output: {}}, action) {
  switch (action.type) {
    case actionConst.findValues: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export default colorReducer;
