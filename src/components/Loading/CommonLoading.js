//import liraries
import React from 'react';
import LottieView from 'lottie-react-native';
import screen from '../../common/constant/screen';
import { View } from 'react-native';

// create a component
const CommonLoading = () => {
  return (
    <View style={{ width: screen.width, height: screen.height, alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        source={require('../../common/assets/lottie/loading.json')}
        autoPlay
        loop
        style={{ width: screen.width / 2, height: screen.height * 0.2 }}
      />
    </View>
  );
};

//make this component available to the app
export default CommonLoading;
