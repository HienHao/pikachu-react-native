import {put, take, fork} from 'redux-saga/effects';
import * as ActionTypes from '../redux/action/ActionTypes';
import {
  checkLineX,
  checkLineY,
  checkReactX,
  checkReactY,
  checkTwoLineX,
  checkTwoLineY,
  checkMoreLineX,
  checkMoreLineY,
  checkLineBarrierXPlus,
  checkLineBarrierXMinus,
  spliceArray,
  concatArray,
  matrixArray16x9,
} from '../redux/reducers/PikachuReducer';

/**
 *
 * @returns {Generator<SimpleEffect<"TAKE", TakeEffectDescriptor>|SimpleEffect<"FORK", ForkEffectDescriptor<never>>, void, *>}
 * kiem tra click 2 element roi day sang worker xu ly
 * watcher lang nghe click 2 lan
 */

export function* watcherClickElementPikachu() {
  while (true) {
    // click element o row nao???
    const element1 = yield take(ActionTypes.CLICK_ELEMENT);
    const element2 = yield take(ActionTypes.CLICK_ELEMENT);
    yield fork(workerClickElementPikachu, element1, element2);
  }
  // --lan goi 1
  // lang nghe 2 lan
  // kiem tra type 2 element
  // neu thanh cong cho qua
  // neu khong thuc hien lai
  // -- lan goi 2 khi da thanh cong
  // can duoc goi lai ham de thuc hien nhung buoc o buoc 1
  // const element1 = yield take(ActionTypes.CLICK_ELEMENT);
  // const element2 = yield take(ActionTypes.CLICK_ELEMENT);
  // click 2 lan moi nhan duoc du lieu
  // yield fork(workerClickElementPikachu, element1, element2);
}

export function* watcherClickPosition() {
  while (true) {
    const arrayMatrix = yield take(ActionTypes.CLICK_POSITION);
    yield fork(workerClickPosition, arrayMatrix);
  }
}

export function* watcherClickReplay() {
  while (true) {
    yield take(ActionTypes.CLICK_REPLAY);
    yield fork(workerClickReplay);
  }
}
/**
 *
 * @param result
 * @returns {Generator<*, void, *>}
 * worker bien doi trang thai enable: true
 */

function* workerClickElementPikachu(element1, element2) {
  // console.log("Saga", element1, element2);

  // barrier
  // thuc hien click 2 elements
  // so sanh 2 type
  // neu 2 elements khac type ==> khong cho sang reducers
  // const element = yield call(() => checkTypeTwoElements(result.element));

  //~~~trường hợp gửi 2 element sang reducers
  if (
    element1.element.type === element2.element.type &&
    element1.element.id !== element2.element.id
  ) {
    const row1 = element1.row,
      row2 = element2.row;
    const col1 = element1.col,
      col2 = element2.col;
    const newState = element1.matrix;
    if (
      (row1 === row2 && checkLineX(newState, col1, col2, row1)) ||
      (col1 === col2 && checkLineY(newState, row1, row2, col1)) ||
      checkReactX(newState, row1, col1, row2, col2) ||
      checkReactY(newState, row1, col1, row2, col2) ||
      checkTwoLineX(newState, row1, col1, row2, col2) ||
      checkTwoLineY(newState, row1, col1, row2, col2) ||
      checkMoreLineX(newState, row1, col1, row2, col2) ||
      checkMoreLineY(newState, row1, col1, row2, col2) ||
      checkLineBarrierXPlus(newState, row1, col1, row2, col2, 1) ||
      checkLineBarrierXMinus(newState, row1, col1, row2, col2, -1)
    ) {
      console.log('new state: ', newState);
      // debugger;
      yield put({
        type: ActionTypes.CLICK_ELEMENT_SUCCESS,
        element1,
        element2,
        matrix: newState,
      });
      yield put({
        type: ActionTypes.SCORE,
        element1,
        element2,
      });

      // console.log(newState);
    }
  }
  // }
  //~~~trong trường hợp chỉ bắn sang reducers 1 element ==.> chỉ thay đổi được 1 element trong state
  // yield put({type: ActionTypes.CLICK_ELEMENT_SUCCESS, result});
  // if(element1.element.type === element2.element.type && element1.element.id !== element2.element.id) {
  //     yield put({type: ActionTypes.CLICK_ELEMENT_SUCCESS, element1, element2});
  // }
}

function* workerClickPosition(action) {
  // const newArrayMatrix = matrixArray16x9(concatArray(action.matrix));
  // console.log(spliceArray(action.matrix, []));
  const elements = concatArray(action.matrix); // 144 elements
  // random
  const random = spliceArray([], elements);
  const newArrayMatrix = matrixArray16x9(random);
  // random element

  // push to new array

  // delete element old array
  yield put({type: ActionTypes.CLICK_POSITION_SUCCESS, newArrayMatrix});
}

function* workerClickReplay() {
  yield put({type: ActionTypes.CLICK_REPLAY_SUCCESS});
}
