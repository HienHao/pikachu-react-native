import * as ActionTypes from './ActionTypes';

export function getMapPikachu() {
  return {type: ActionTypes.GET_MAP_PIKACHU};
}

export function clickElement(matrix, element, row, col) {
  return {type: ActionTypes.CLICK_ELEMENT, matrix, element, row, col};
}

export function updateLevel() {
  return {type: ActionTypes.LEVEL};
}

export function clickPosition(matrix) {
  return {type: ActionTypes.CLICK_POSITION, matrix};
}

export function clickReplay() {
  return {type: ActionTypes.CLICK_REPLAY};
}
