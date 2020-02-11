import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import TouchBtn from './TouchBtn';

export default class ImageWithBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: '100%',
      imageHeight: 'auto',
      imageOrigWidth: '100%',
      imageOrigHeight: '100%',
      btns: [],
      imagePath: props.imagePath,
    };
  }
  componentDidMount() {
    this.getOrigSizes();
  }

  //get image size
  getOrigSizes = () => {
    Image.getSize(
      {
        uri: `file://${this.state.imagePath}`,
      },
      (width, height) => {
        this.setState({
          imageOrigWidth: width,
          imageOrigHeight: height,
        });
      },
    );
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
      btns: this.props.data.bounding_data.word_data,
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
      <View onLayout={this.onChangePositions} style={styles.mainWrapper}>
        <ImageZoom
          style={{borderWidth: 2}}
          cropWidth={Dimensions.get('window').width}
          cropHeight={600}
          enableSwipeDown={true}
          enableCenterFocus={false}
          imageWidth={this.state.imageWidth}
          imageHeight={this.state.imageHeight}>
          {this.state.imageHeight !== 'auto' ? (
            <View
              style={{
                height: this.state.imageHeight,
                width: this.state.imageWidth,
              }}>
              <Image
                style={{
                  height: this.state.imageHeight,
                  width: this.state.imageWidth,
                }}
                resizeMode={'cover'}
                source={{isStatic: true, uri: `${this.state.imagePath}`}}
              />
              {this.btnRenders()}
            </View>
          ) : (
            <ActivityIndicator size="large" color="green" />
          )}
        </ImageZoom>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainWrapper: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
