//import liraries
import { Flex, WingBlank } from '@ant-design/react-native';
import React, { useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import screen from '../../common/constant/screen';
import { OPEN_MODAL } from '../../redux/common';
const HEADER_HEIGHT = 55;
// create a component
const CommonFloat = ({ translation }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const updateSearch = (search) => {
    setSearch(search);
  };

  const openModal = () => {
    dispatch(OPEN_MODAL('category'));
    return false;
  };

  return (
    <SafeAreaView style={styles.main}>
      <Animated.View style={[styles.container, { transform: [{ translateY: translation }] }]}>
        <WingBlank size="lg">
          <Flex>
            <Flex.Item>
              <Button
                title="category"
                icon={{ name: 'chevron-down', type: 'font-awesome', size: 12 }}
                titleStyle={{ color: 'black' }}
                buttonStyle={{ backgroundColor: '#f8f9fa', borderWidth: 0, borderRadius: 30 }}
                containerStyle={{ width: 180 }}
                iconContainerStyle={{ marginLeft: 60 }}
                iconRight
                onPress={() => openModal()}
              />
            </Flex.Item>
            <Flex.Item style={{ alignItems: 'flex-end' }}>
              <Button
                title="search"
                icon={{ name: 'search', type: 'font-awesome', size: 15 }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ color: 'black' }}
                buttonStyle={{ backgroundColor: '#f8f9fa', borderWidth: 0, borderRadius: 30 }}
                containerStyle={{ width: 120 }}
              />
            </Flex.Item>
          </Flex>
        </WingBlank>
      </Animated.View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  main: { position: 'absolute', zIndex: 1000 },
  container: {
    height: HEADER_HEIGHT,
    width: screen.width,
    borderRadius: 0,
    borderTopColor: 'white',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingBottom: 8,
  },
});

//make this component available to the app
export default CommonFloat;
