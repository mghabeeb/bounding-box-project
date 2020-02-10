/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';

import TouchBtn from './components/TouchBtn';

const data = require('./data.json');
class App extends React.Component {
  //state object
  state = {
    imageWidth: '100%',
    imageHeight: '100%',
    imageOrigWidth: '100%',
    imageOrigHeight: '100%',
    btns: [],
  };
  componentDidMount() {
    this.getOrigSizes();
  }

  //get image size
  getOrigSizes = () => {
    const img = require('./imageExample.jpeg');
    const imgProps = Image.resolveAssetSource(img);
    this.setState({
      imageOrigWidth: imgProps.width,
      imageOrigHeight: imgProps.height,
    });
  };

  //get image wrapper size
  onChangePositions = e => {
    let {
      nativeEvent: {
        layout: {width, height},
      },
    } = e;
    this.setState(
      {
        containerWidth: width,
        containerHeight: height,
      },
      () => this.setImageSize(),
    );
  };

  //set size
  setImageSize = () => {
    let proportion = this.state.imageOrigHeight / this.state.imageOrigWidth;
    let _imageWidth = this.state.containerHeight / proportion;
    _imageWidth =
      _imageWidth > this.state.containerWidth
        ? this.state.containerWidth
        : _imageWidth;

    let _imageHeight = this.state.containerHeight;
    _imageHeight =
      _imageWidth === this.state.containerWidth
        ? _imageWidth * proportion
        : _imageHeight;

    let koefH = _imageHeight / this.state.imageOrigHeight;
    let koefW = _imageWidth / this.state.imageOrigWidth;

    this.setState({
      koefH: koefH,
      koefW: koefW,
      imageHeight: _imageHeight,
      imageWidth: _imageWidth,
      btns: data.bounding_data.word_data,
    });
  };
  btnRenders = () => {
    return this.state.btns.map((button, index) => (
      <TouchBtn
        onPress={() => alert(button.paragraph_id)}
        key={index}
        style={this.getAbsoluteCoordsSizes(button.bounding_box_data)}
      />
    ));
  };
  getAbsoluteCoordsSizes = array => {
    let height = (array[3].y - array[0].y) * this.state.koefH;
    let width = (array[1].x - array[0].x) * this.state.koefW;
    let top = array[0].y * this.state.koefH;
    let left = array[0].x * this.state.koefW;
    return {
      width: width,
      top: top,
      left: left,
      height: height,
    };
  };
  render() {
    return (
      <>
        <SafeAreaView>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderColor: 'red',
              borderWidth: 0,
            }}>
            {/*Wrapper*/}
            <View
              onLayout={this.onChangePositions}
              style={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
              }}>
              <Image
                style={{
                  height: this.state.imageHeight,
                  width: this.state.imageWidth,
                }}
                resizeMethod={'scale'}
                resizeMode={'cover'}
                source={require('./imageExample.jpeg')}
              />
              {this.btnRenders()}
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
