import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    height: 0,
    width: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'green',
    zIndex: 1,
  },
});

const Button = props => (
  <TouchableOpacity {...props} style={[styles.button, props.style]} />
);

export default Button;
