import React from 'react';

import Play from './Play/Play';
import Timebar from './Timebar/Timebar';
import Info from './Info/Info';

import {View} from 'react-native';
import styleMainPlaySection from './styleMainPlaySection';

class MainSection extends React.Component {
  render() {
    return (
      <View style={styleMainPlaySection.mainSection}>
        <Info />
        <Play />
        <Timebar />
      </View>
    );
  }
}

export default MainSection;
