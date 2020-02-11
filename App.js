/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ImageWithBoxes from './components/imageWithBoxes';
const data = require('./data.json');

class App extends React.Component {
  render() {
    return (
      <>
        <SafeAreaView>
          <View style={styles.container}>
            <ImageWithBoxes
              data={data}
              imagePath="/Users/rob/projects/demo/imageExample.jpeg"
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderColor: 'red',
    borderWidth: 0,
  },
});

export default App;
