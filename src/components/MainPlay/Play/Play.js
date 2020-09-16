import React from 'react';
import * as ActionsPikachu from '../../../redux/action/PikachuActions';
import {connect} from 'react-redux';
import {Image, View, ScrollView} from 'react-native';

import stylePlay from './stylePlay';

class Play extends React.Component {
  componentDidMount() {
    const {getMapPikachu} = this.props;
    getMapPikachu();
  }

  elementImage(element, row, col, clickElement) {
    debugger;
    const colorCheckLine = element.checkLine ? 'red' : '';
    return (
      <View className="box">
        <View
          className="hoverBox"
          onClick={() => {
            clickElement(playProps, element, row, col);
          }}
        />
        {element.statusEnable === false ? (
          // <Text>123123</Text>
          <Image
            source={element.image}
            key={element.id}
            style={stylePlay.styleImage}
          />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
  // component array 16 images
  componentElement(elements, row, clickElement) {
    debugger;
    return (
      <View style={stylePlay.main__play__item}>
        {elements.map((element, col) =>
          this.elementImage(element, row, col, clickElement),
        )}
      </View>
    );
  }

  displayElements(elements, clickElement) {
    debugger;
    return elements.map((element, row) =>
      this.componentElement(element, row, clickElement),
    );
  }

  render() {
    const {playProps, clickElement} = this.props;
    return (
      <View className="main">
        <ScrollView>{this.displayElements(playProps, clickElement)}</ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    playProps: state.PikachuReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMapPikachu: () => dispatch(ActionsPikachu.getMapPikachu()),
    clickElement: (array, element, row, col) =>
      dispatch(ActionsPikachu.clickElement(array, element, row, col)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
