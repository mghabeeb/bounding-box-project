/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';

const data = require('./data.json');
class App extends React.Component {
  componentDidMount() {
    console.log(data);
  }
  render() {
    return (
      <>
        <SafeAreaView>
          <ImageBackground
            source={require('./imageExample.jpeg')}
            style={{width: '100%', height: '100%'}}
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
