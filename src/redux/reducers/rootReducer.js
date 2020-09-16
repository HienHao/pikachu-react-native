import {combineReducers} from 'redux';
import PikachuReducer from './PikachuReducer';
import InfoReducer from './InfoReducer';

const RootReducer = combineReducers({
  PikachuReducer,
  InfoReducer,
});

export default RootReducer;
