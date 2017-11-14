import * as actions from './action-const';

/*  
 *  Actions are for pipelining the data states between reducers and the webapp
 */

export function findColor(data) {
  return {
    type: actions.findColor,
    colorCode: data.colorCode,
    inputValue: data.inputValue
  }
}

export function findColorError(data) {
  return {
    type: actions.findColorError,
    error: data.error,
    inputValue: data.inputValue
  }
}

export function solveTolerance(data) {
  return {
    type: actions.solveTolerance,
    eventType: data.eventType,
    tolerance: data.tolerance,
    colorTolerance: data.colorTolerance 
  }
}

export function solveColor(data) {
  return {
    type: actions.solveColor,
    eventType: data.eventType,
    colorCode: data.colorCode,
    value: data.value,
    tolerance: data.tolerance
  }
}

export function revertState() {
  return {
    type: actions.revertState
  }
}
