import {v4 as uuidv4} from 'uuid';
import * as ActionTypes from '../action/ActionTypes';

const urlImage = '../../../../android/assets/images/';
const elements = [
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/1.png'),
    type: 'pikachu1',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/2.png'),
    type: 'pikachu2',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/3.png'),
    type: 'pikachu3',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/4.png'),
    type: 'pikachu4',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/5.png'),
    type: 'pikachu5',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/6.png'),
    type: 'pikachu6',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/7.png'),
    type: 'pikachu7',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/8.png'),
    type: 'pikachu8',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/9.png'),
    type: 'pikachu9',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/10.png'),
    type: 'pikachu10',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/11.png'),
    type: 'pikachu11',
    statusEnable: false,
    barrier: false,
  },
  {
    id: uuidv4(),
    image: require('../../../android/assets/images/12.png'),
    type: 'pikachu12',
    statusEnable: false,
    barrier: false,
  },
];

const initialState = matrixArray16x9(randomElements(elements));

function PikachuReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_MAP_PIKACHU:
      return [...state];
    case ActionTypes.CLICK_ELEMENT_SUCCESS:
      const {element1, element2} = action;
      console.log('action: ', action);
      const newState = [...state];
      changeStatusEnable(newState, element1, element2);
      // debugger;
      return [...newState];
    case ActionTypes.CLICK_REPLAY_SUCCESS:
      return matrixArray16x9(randomElements(elements));
    case ActionTypes.CLICK_POSITION_SUCCESS:
      return [...action.newArrayMatrix];
    default:
      return state;
  }
}

// generate 144 elements
function genOneHundredFortyFourElements(
  newArray,
  id,
  image,
  type,
  statusEnable,
  barrier,
  checkLine,
) {
  for (let i = 0; i < 12; i++) {
    newArray.push({
      id: uuidv4(),
      image,
      type,
      statusEnable,
      barrier,
      checkLine,
    });
  }
  return newArray;
}
// xoa duong bien va gop 2 mang
export function concatArray(oldArray) {
  function concatTwoElements(element1, element2) {
    return element1.concat(element2);
  }

  // oldArray -> array
  // elements in oldArray is array
  const convertArray = [...oldArray];
  convertArray.splice(0, 1);
  convertArray.splice(convertArray.length - 1, 1);
  // xoa duong bien
  for (let i = 0; i < convertArray.length; i++) {
    if (convertArray[i]) {
      convertArray[i].splice(0, 1);
      convertArray[i].splice(convertArray[i].length - 1, 1);
    }
  }
  return convertArray.reduce(concatTwoElements);
}
// random mang 1 chieu
export function spliceArray(arrayRandom, array) {
  let indexItem = null;
  let item = null;
  for (let i = 0; i < 144; i++) {
    indexItem = Math.floor(Math.random() * array.length);
    item = array[indexItem];
    arrayRandom.push(item);
    array.splice(indexItem, 1);
  }
  return arrayRandom;
}
// random mang 1 chieu
function randomElements(elements) {
  //sinh 114 phan tu trong state
  // trong do 1 phan tu duoc gen ra 12 lan
  const newArray = [];
  elements.map((e) =>
    genOneHundredFortyFourElements(
      newArray,
      e.id,
      e.image,
      e.type,
      e.statusEnable,
      e.barrier,
      e.checkLine,
    ),
  );
  return spliceArray([], newArray);
}

// cat mang 1 chieu thanh mang 2 chieu
export function matrixArray16x9(elements) {
  let arraySixteenElements = null;
  let matrixArray = [];
  let arrayBarrier = [];
  for (let i = 0; i < 18; i++) {
    arrayBarrier.push({image: '', barrier: true});
  }
  matrixArray.unshift(arrayBarrier);
  let startSlice = 0,
    endSlice = startSlice + 16;
  const limit = 16;
  let row = 1;
  for (let i = 0; i < elements.length / limit; i++) {
    startSlice = (row - 1) * limit;
    endSlice = row * limit;
    arraySixteenElements = elements.slice(startSlice, endSlice);
    arraySixteenElements.push({image: '', barrier: true});
    arraySixteenElements.unshift({image: '', barrier: true});
    matrixArray.push(arraySixteenElements);
    row++;
  }
  matrixArray.push(arrayBarrier);
  return matrixArray;
}
// canh nhau
export function checkLineX(matrix, y1, y2, x) {
  //check point min max
  const min = Math.min(y1, y2);
  const max = Math.max(y1, y2);
  // debugger;
  for (let y = min + 1; y < max; y++) {
    if (matrix[x][y].barrier !== true) {
      console.log('die ', x, ' , ', y);
      return false;
    }
    console.log('success ', x, ' , ', y);
  }
  removeDefaultCheckLine(matrix);
  for (let i = min; i <= max; i++) {
    matrix[x][i].checkLine = true;
  }
  return true;
}

export function checkLineY(matrix, x1, x2, y) {
  //check point min, max
  const min = Math.min(x1, x2);
  const max = Math.max(x1, x2);
  //run row
  // debugger;
  for (let x = min + 1; x < max; x++) {
    if (matrix[x][y].barrier !== true) {
      console.log('die ', x, ' , ', y);
      // debugger;
      return false;
    }
    console.log('success ', x, ' , ', y);
  }
  removeDefaultCheckLine(matrix);
  for (let i = min; i <= max; i++) {
    matrix[i][y].checkLine = true;
  }
  return true;
}

// chu U
export function checkLineBarrierXPlus(matrix, x1, y1, x2, y2, target) {
  console.log('checkLineBarrierXPlus');
  let pMinY = {x: x1, y: y1},
    pMaxY = {x: x2, y: y2};
  if (y1 > y2) {
    pMinY = {x: x2, y: y2};
    pMaxY = {x: x1, y: y1};
  }
  // x chay
  let xm = x1 + target;
  // check line x - > xm
  if (target > 18 || target < 0) return false;
  if (checkLineY(matrix, pMinY.x, xm, pMinY.y)) {
    if (
      checkLineX(matrix, pMinY.y, pMaxY.y, xm) &&
      checkLineY(matrix, xm, pMaxY.x, pMaxY.y)
    ) {
      console.log('check line x have barrier');
      console.log(
        '(' +
          pMinY.x +
          ',' +
          pMinY.y +
          ') -> (' +
          xm +
          ',' +
          pMinY.y +
          ') -> (' +
          xm +
          ',' +
          pMaxY.y +
          ') -> (' +
          pMaxY.x +
          ',' +
          pMaxY.y +
          ')',
      );
      removeDefaultCheckLine(matrix);
      console.log('xm = ', xm);
      for (let j = pMinY.y; j <= pMaxY.y; j++) {
        matrix[xm][j].checkLine = true;
        console.log('matrix[xm][j] = ', matrix[xm][j]);
      }
      // matrix[xm][pMinY.y].checkLine = true;
      matrix[pMinY.x][pMinY.y].checkLine = true;
      matrix[pMaxY.x][pMaxY.y].checkLine = true;
      // matrix[xm][pMinY.y].checkLine = true;
      // matrix[xm][pMaxY.y].checkLine = true;
      // console.log('matrix checkLineBarrierXPlus = ', matrix);
      // console.log('matrix reducer: ',matrix, 'matrix[',xm,'][',pMinY.y,'] = ', matrix[xm][pMinY.y], 'matrix[',xm,'][',pMaxY.y,'] = ', matrix[xm][pMaxY.y]);
      console.log('matrix[', xm, '][', pMinY.y, '] = ', matrix[xm][pMinY.y]);
      return true;
    }
    target += 1;
    checkLineBarrierXPlus(matrix, x1, y1, x2, y2, target);
  }
  return false;
}

export function checkLineBarrierXMinus(matrix, x1, y1, x2, y2, target) {
  console.log('checkLineBarrierXMinus');
  let pMinY = {x: x1, y: y1},
    pMaxY = {x: x2, y: y2};
  if (y1 > y2) {
    pMinY = {x: x2, y: y2};
    pMaxY = {x: x1, y: y1};
  }
  let xm = x1 + target;
  // debugger;
  if (checkLineY(matrix, pMinY.x, xm, pMinY.y)) {
    if (
      checkLineX(matrix, pMinY.y, pMaxY.y, xm) &&
      checkLineY(matrix, xm, pMaxY.x, pMaxY.y)
    ) {
      console.log('check line x have barrier');
      console.log(
        '(' +
          pMinY.x +
          ',' +
          pMinY.y +
          ') -> (' +
          xm +
          ',' +
          pMinY.y +
          ') -> (' +
          xm +
          ',' +
          pMaxY.y +
          ') -> (' +
          pMaxY.x +
          ',' +
          pMaxY.y +
          ')',
      );
      removeDefaultCheckLine(matrix);
      console.log('xm = ', xm);
      for (let j = pMinY.y; j <= pMaxY.y; j++) {
        matrix[xm][j].checkLine = true;
        console.log('matrix[', xm, '][', j, '] = ', matrix[xm][j]);
      }
      // matrix[xm][pMinY.y].checkLine = true;
      matrix[pMinY.x][pMinY.y].checkLine = true;
      matrix[pMaxY.x][pMaxY.y].checkLine = true;
      // matrix[xm][pMinY.y].checkLine = true;
      // matrix[xm][pMaxY.y].checkLine = true;
      // console.log('matrix checkLineBarrierXMinus = ', matrix);
      // console.log('matrix reducer: ',matrix, 'matrix[',xm,'][',pMinY.y,'] = ', matrix[xm][pMinY.y], 'matrix[',xm,'][',pMaxY.y,'] = ', matrix[xm][pMaxY.y]);
      console.log('matrix[', xm, '][', pMinY.y, '] = ', matrix[xm][pMinY.y]);
      return true;
    }
    target -= 1;
    checkLineBarrierXMinus(matrix, x1, y1, x2, y2, target);
  }
  return false;
}

export function checkLineBarrierYPlus(matrix, x1, y1, x2, y2, target) {
  let pMinX = {x: x1, y: y1},
    pMaxX = {x: x2, y: y2};
  if (x1 > x2) {
    pMinX = {x: x2, y: y2};
    pMaxX = {x: x1, y: y1};
  }
  // x chay
  let ym = y1 + target;
  // check line x - > xm
  if (target > 11 || target < 0) return false;
  if (checkLineY(matrix, pMinX.y, ym, pMinX.x)) {
    if (
      checkLineX(matrix, pMinX.x, pMaxX.x, ym) &&
      checkLineY(matrix, ym, pMaxX.y, pMaxX.x)
    ) {
      console.log('check line x have barrier');
      console.log(
        '(' +
          pMinX.x +
          ',' +
          pMinX.y +
          ') -> (' +
          pMinX.x +
          ',' +
          ym +
          ') -> (' +
          pMaxX.x +
          ',' +
          ym +
          ') -> (' +
          pMaxX.x +
          ',' +
          pMaxX.y +
          ')',
      );
      return true;
    }
    target += 1;
    checkLineBarrierYPlus(matrix, x1, y1, x2, y2, target);
  }
  return false;
}

export function checkLineBarrierYMinus(matrix, x1, y1, x2, y2, target) {
  let pMinX = {x: x1, y: y1},
    pMaxX = {x: x2, y: y2};
  if (x1 > x2) {
    pMinX = {x: x2, y: y2};
    pMaxX = {x: x1, y: y1};
  }
  let ym = y1 + target;
  if (target > 11 || target < 0) return false;
  // debugger;
  if (checkLineY(matrix, pMinX.y, ym, pMinX.x)) {
    if (
      checkLineX(matrix, pMinX.x, pMaxX.x, ym) &&
      checkLineY(matrix, ym, pMaxX.y, pMaxX.x)
    ) {
      console.log('check line x have barrier');
      console.log(
        '(' +
          pMinX.x +
          ',' +
          pMinX.y +
          ') -> (' +
          pMinX.x +
          ',' +
          ym +
          ') -> (' +
          pMaxX.x +
          ',' +
          ym +
          ') -> (' +
          pMaxX.x +
          ',' +
          pMaxX.y +
          ')',
      );
      return true;
    }
    target -= 1;
    checkLineBarrierYMinus(matrix, x1, y1, x2, y2, target);
  }
  return false;
}

// chu z
//kiem tra lai dau vao khi gap loi
export function checkReactX(matrix, x1, y1, x2, y2) {
  console.log('ckeck react x');
  // find point have y min and max
  let pMinY = {x: x1, y: y1},
    pMaxY = {x: x2, y: y2};
  if (y1 > y2) {
    pMinY = {x: x2, y: y2};
    pMaxY = {x: x1, y: y1};
  }
  if (x1 === x2) return false;
  for (let y = pMinY.y + 1; y < pMaxY.y; y++) {
    // (matrix[pMaxY.x][y].barrier === true)
    if (
      checkLineX(matrix, pMinY.y, y, pMinY.x) &&
      checkLineY(matrix, pMinY.x, pMaxY.x, y) &&
      checkLineX(matrix, y, pMaxY.y, pMaxY.x)
    ) {
      console.log('React x');
      console.log(
        '(' +
          pMinY.x +
          ',' +
          pMinY.y +
          ') -> (' +
          pMinY.x +
          ',' +
          y +
          ') -> (' +
          pMaxY.x +
          ',' +
          y +
          ') -> (' +
          pMaxY.x +
          ',' +
          pMaxY.y +
          ')',
      );
      removeDefaultCheckLine(matrix);
      matrix[pMinY.x][pMinY.y].checkLine = true;
      for (let i = pMinY.x; i <= pMaxY.x; i++) {
        matrix[i][y].checkLine = true;
      }
      // matrix[pMinY.x][y].checkLine = true;
      // matrix[pMaxY.x][y].checkLine = true;
      matrix[pMaxY.x][pMaxY.y].checkLine = true;
      console.log('matrix checkReactX = ', matrix);
      console.log(
        'matrix[',
        pMinY.x,
        '][',
        y,
        '] = ',
        matrix[pMinY.x][y],
        '\n matrix[',
        pMaxY.x,
        '][',
        y,
        '] = ',
        matrix[pMaxY.x][y],
      );
      return true;
    }
  }
  return false;
}

export function checkReactY(matrix, x1, y1, x2, y2) {
  console.log('ckeck react y');
  // find point have y min and max
  let pMinX = {x: x1, y: y1},
    pMaxX = {x: x2, y: y2};
  if (x1 > x2) {
    pMinX = {x: x2, y: y2};
    pMaxX = {x: x1, y: y1};
  }
  if (y1 === y2) return false;
  for (let x = pMinX.x + 1; x < pMaxX.x; x++) {
    // (matrix[pMaxY.x][y].barrier === true)
    if (
      checkLineX(matrix, pMinX.x, x, pMinX.y) &&
      checkLineY(matrix, pMinX.y, pMaxX.y, x) &&
      checkLineX(matrix, x, pMaxX.x, pMaxX.y)
    ) {
      console.log('React y');
      console.log(
        '(' +
          pMinX.x +
          ',' +
          pMinX.y +
          ') -> (' +
          x +
          ',' +
          pMinX.y +
          ') -> (' +
          x +
          ',' +
          pMaxX.y +
          ') -> (' +
          pMaxX.x +
          ',' +
          pMaxX.y +
          ')',
      );
      removeDefaultCheckLine(matrix);
      matrix[pMinX.x][pMinX.y].checkLine = true;
      for (let i = pMinX.y; i < pMaxX.y; i++) {
        matrix[x][i].checkLine = true;
      }
      // matrix[x][pMinX.y].checkLine = true;
      // matrix[x][pMaxX.y].checkLine = true;
      matrix[pMaxX.x][pMaxX.y].checkLine = true;
      console.log('matrix checkReactY = ', matrix);
      console.log(
        'matrix[',
        x,
        '][',
        pMinX.y,
        '] = ',
        matrix[x][pMinX.y],
        '\n matrix[',
        x,
        '][',
        pMaxX.y,
        '] = ',
        matrix[x][pMaxX.y],
      );
      return true;
    }
  }
  return false;
}

export function checkTwoLineY(matrix, x1, y1, x2, y2) {
  console.log('check two line y');
  let pMin = {x: x1, y: y1},
    pMax = {x: x2, y: y2};
  if (x1 > x2) {
    pMin = {x: x2, y: y2};
    pMax = {x: x1, y: y1};
  }
  // debugger;
  for (let x = pMin.x; x < pMax.x; x++) {
    if (
      checkLineX(matrix, pMin.y, pMax.y, pMin.x) &&
      checkLineY(matrix, pMin.x, pMax.x, pMax.y)
    ) {
      console.log('Two line x');
      console.log(
        '(' +
          pMin.x +
          ',' +
          pMin.y +
          ') -> (' +
          pMin.x +
          ',' +
          pMax.y +
          ') -> (' +
          pMax.x +
          ',' +
          pMax.y +
          ')',
      );
      removeDefaultCheckLine(matrix);
      matrix[pMin.x][pMin.y].checkLine = true;
      matrix[pMin.x][pMax.y].checkLine = true;
      matrix[pMax.x][pMax.y].checkLine = true;
      console.log('matrix checkTwoLineY = ', matrix);
      console.log(
        'matrix[',
        pMin.x,
        '][',
        pMin.y,
        '] = ',
        matrix[pMin.x][pMin.y],
        '\n matrix[',
        pMin.x,
        '][',
        pMax.y,
        '] = ',
        matrix[pMin.x][pMax.y],
        '\n matrix[',
        pMax.x,
        '][',
        pMax.y,
        '] = ',
        matrix[pMax.x][pMax.y],
      );
      return true;
    }
  }
  return false;
}

export function checkTwoLineX(matrix, x1, y1, x2, y2) {
  console.log('check two line x');
  let pMin = {x: x1, y: y1},
    pMax = {x: x2, y: y2};
  if (y1 > y2) {
    pMin = {x: x2, y: y2};
    pMax = {x: x1, y: y1};
  }
  for (let y = pMin.y; y < pMax.y; y++) {
    if (
      checkLineY(matrix, pMin.x, pMax.x, pMin.y) &&
      checkLineX(matrix, pMin.y, pMax.y, pMax.x)
    ) {
      console.log('Two line y');
      console.log(
        '(' +
          pMin.x +
          ',' +
          pMin.y +
          ') -> (' +
          pMin.x +
          ',' +
          pMax.y +
          ') -> (' +
          pMax.x +
          ',' +
          pMax.y +
          ')',
      );
      removeDefaultCheckLine(matrix);
      matrix[pMin.x][pMin.y].checkLine = true;
      matrix[pMin.x][pMax.y].checkLine = true;
      matrix[pMax.x][pMax.y].checkLine = true;
      console.log('matrix checkTwoLineX = ', matrix);
      console.log(
        'matrix[',
        pMin.x,
        '][',
        pMin.y,
        '] = ',
        matrix[pMin.x][pMin.y],
        '\n matrix[',
        pMin.x,
        '][',
        pMax.y,
        '] = ',
        matrix[pMin.x][pMax.y],
        '\n matrix[',
        pMax.x,
        '][',
        pMax.y,
        '] = ',
        matrix[pMax.x][pMax.y],
      );
      return true;
    }
  }
  return false;
}

export function checkMoreLineX(matrix, x1, y1, x2, y2) {
  console.log('check more line x');
  let pMinY = {x: x1, y: y1},
    pMaxY = {x: x2, y: y2};
  if (y1 > y2) {
    pMaxY = {x: x2, y: y2};
    pMinY = {x: x1, y: y1};
  }
  if (y1 === y2) return false;
  for (let y = pMinY.y; y < pMaxY.y; y++) {
    if (
      checkLineX(matrix, pMinY.y, pMaxY.y, pMinY.x) &&
      checkLineX(matrix, pMaxY.y, y, pMinY.x) &&
      checkLineY(matrix, pMinY.x, pMaxY.x, y) &&
      checkLineX(matrix, y, pMaxY.y, pMaxY.x)
    ) {
      console.log('more line x');
      console.log(
        '(' +
          pMinY.x +
          ',' +
          pMinY.y +
          ') -> (' +
          pMinY.x +
          ',' +
          pMaxY.y +
          ') -> (' +
          pMinY.x +
          ',' +
          y +
          ') -> (' +
          pMaxY.x +
          ',' +
          y +
          ') -> (' +
          pMaxY.x +
          ',' +
          pMaxY.y +
          ')',
      );
      removeDefaultCheckLine(matrix);
      matrix[pMinY.x][pMinY.y].checkLine = true;
      matrix[pMinY.x][pMaxY.y].checkLine = true;
      matrix[pMinY.x][y].checkLine = true;
      matrix[pMaxY.x][y].checkLine = true;
      matrix[pMaxY.x][pMaxY.y].checkLine = true;
      console.log('matrix checkMoreLineX = ', matrix);
      console.log(
        'matrix[',
        pMinY.x,
        '][',
        pMaxY.y,
        '] = ',
        matrix[pMinY.x][pMaxY.y],
        '\n matrix[',
        pMinY.x,
        '][',
        y,
        '] = ',
        matrix[pMinY.x][y],
        '\n matrix[',
        pMaxY.x,
        '][',
        y,
        ']',
      );
      return true;
    }
  }
  return false;
}

export function checkMoreLineY(matrix, x1, y1, x2, y2) {
  console.log('check more line y');
  let pMinX = {x: x1, y: y1},
    pMaxX = {x: x2, y: y2};
  if (x1 > x2) {
    pMaxX = {x: x2, y: y2};
    pMinX = {x: x1, y: y1};
  }
  if (x1 === x2) return false;
  for (let x = pMinX.x; x < pMaxX.x; x++) {
    if (
      checkLineY(matrix, pMinX.x, pMaxX.x, pMinX.y) &&
      checkLineY(matrix, pMaxX.x, x, pMinX.y) &&
      checkLineX(matrix, pMinX.y, pMaxX.y, x) &&
      checkLineY(matrix, x, pMaxX.x, pMaxX.y)
    ) {
      console.log('more line y');
      console.log(
        '(' +
          pMinX.x +
          ',' +
          pMinX.y +
          ') -> (' +
          pMaxX.x +
          ',' +
          pMinX.y +
          ') -> (' +
          x +
          ',' +
          pMinX.y +
          ') -> (' +
          x +
          ',' +
          pMaxX.y +
          ') -> (' +
          pMaxX.x +
          ',' +
          pMaxX.y +
          ')',
      );
      removeDefaultCheckLine(matrix);

      matrix[pMaxX.x][pMinX.y].checkLine = true;
      matrix[x][pMinX.y].checkLine = true;
      matrix[x][pMaxX.y].checkLine = true;
      matrix[pMaxX.x][pMaxX.y].checkLine = true;
      // console.log('matrix checkMoreLineY = ', matrix);
      // console.log('matrix[',pMaxX.x,'][',pMinX.y,'] = ', matrix[pMaxX.x][pMinX.y], '\n matrix[',x,'][',pMinX.y,'] = ', matrix[x][pMinX.y], '\n matrix[',x,'][',pMaxX.y,'] = ', matrix[x][pMaxX.y]);
      return true;
    }
  }
  return false;
}

function changeStatusEnable(state, element1, element2) {
  const item1 = state[element1.row].find(
    (el1) => el1.id === element1.element.id,
  );
  const item2 = state[element2.row].find(
    (el2) => el2.id === element2.element.id,
  );
  item1.statusEnable = true;
  item1.barrier = true;
  item2.statusEnable = true;
  item2.barrier = true;
}

function removeDefaultCheckLine(matrix) {
  matrix.map((element) => element.map((e) => delete e.checkLine));
}

export default PikachuReducer;
