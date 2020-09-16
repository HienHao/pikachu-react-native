import {all} from 'redux-saga/effects';
import * as PikachuSaga from './piakachuSaga';

export default function* rootSaga() {
  yield all([
    PikachuSaga.watcherClickElementPikachu(),
    PikachuSaga.watcherClickPosition(),
    PikachuSaga.watcherClickReplay(),
  ]);
}
