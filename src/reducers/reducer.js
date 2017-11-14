import * as actionConst from '../actions/action-const';

const initialState = {
  colorCode: {
    '1': 'saddlebrown',
    '2': 'black',
    '3': 'red'
  },
  opacity: 1,
  value: '1000',
  error: null,
  tolerance: '5%',
  colorTolerance: 'gold'
}

var holdState = initialState;

function reducer(state=initialState, action) {
  switch (action.type) {
    case actionConst.findColor: {
      let newState = holdState = {
        ...state,
        error: null,
        value: null,
        opacity: 1,
        colorCode: action.colorCode
      };
      holdState.value = action.inputValue;
      return newState;
    }
    case actionConst.findColorError: {
      let newState = holdState = {
        ...state,
        opacity: 0.5,
        error: action.error,
        value: null
      };
      holdState.value = action.inputValue;
      return newState;
    }
    case actionConst.solveColor: {
      let newState = {
        ...state,
        error: null,
        opacity: 1,
        value: action.value,
        colorCode: action.colorCode
      }
      if (action.eventType == 'click') {
        holdState = newState;
      }
      return newState;
    }
    case actionConst.solveTolerance: {
      let newState = {
        ...state,
        error: null,
        tolerance: action.tolerance,
        colorTolerance: action.colorTolerance
      }
      if (action.eventType == 'click') {
        holdState = newState;
      }
      return newState;
    }
    case actionConst.revertState: {
      return holdState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;
