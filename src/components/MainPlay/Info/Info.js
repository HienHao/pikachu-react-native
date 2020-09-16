import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import styleMainPlaySection from './styleInfo';

class Info extends React.Component {
  render() {
    return (
      <View style={styleMainPlaySection.main__info}>
        <View className="main__info__level">
          <Text>Bàn</Text>
          <Text>0</Text>
        </View>
        <View className="main__info__blood">
          <Text>Lượt đổi</Text>
          <Text>10</Text>
        </View>
        <View className="main__info__score">
          <Text>Điểm</Text>
          <Text>0</Text>
        </View>
      </View>
    );
  }
}

export default Info;
