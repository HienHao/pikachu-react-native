import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Button} from 'react-native';

import footerStyle from './FooterStyle';

class Footer extends Component {
  render() {
    return (
      <View style={footerStyle.footer}>
        <Button
          style={footerStyle.footer__changeBlock}
          // onClick={() => clickPosition(PikachuReducer)}
          title="Đổi vị trí"
        />
        <Button
          style={footerStyle.footer__replay}
          // onClick={clickReplay}
          title="Chơi lại"
        />
      </View>
    );
  }
}

export default Footer;
