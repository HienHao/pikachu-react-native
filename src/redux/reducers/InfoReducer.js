import * as ActionTypes from '../action/ActionTypes';

const initialSate = {
  score: 0,
  level: 1,
  position: 10,
  count: 0,
};

function InforReducer(state = initialSate, action) {
  switch (action.type) {
    case ActionTypes.SCORE:
      const newState = {...state};
      const {element1, element2} = action;
      if (element1 && element2) {
        if (element1.element.statusEnable && element2.element.statusEnable) {
          newState.score += 10;
          newState.count += 2;
        }
      }
      if (newState.count === 144) {
        newState.count = 0;
        newState.level += 1;
      }
      // console.log('state: ', newState);
      return {...newState};
    case ActionTypes.CLICK_POSITION_SUCCESS:
      // console.log('position');
      const statePosition = {...state};
      statePosition.position -= 1;
      if (statePosition.position === 0) {
        statePosition.position = 0;
      }
      return {...statePosition};
    case ActionTypes.CLICK_REPLAY_SUCCESS:
      const stateReplay = {...state};
      stateReplay.count = 0;
      stateReplay.level = 1;
      stateReplay.position = 10;
      stateReplay.score = 0;
      return {...stateReplay};
    default:
      return {...state};
  }
}

export default InforReducer;
