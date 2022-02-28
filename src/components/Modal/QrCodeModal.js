//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CLOSE_MODAL } from '../../redux/common';
import { Card, Flex, WingBlank } from '@ant-design/react-native';
import Barcode from 'react-native-barcode-expo';
import mainStyle from '../../common/constant/mainStyle';
import screen from '../../common/constant/screen';
import font from '../../common/constant/font';
import colors from '../../common/constant/colors';
import { Overlay } from 'react-native-elements';
// create a component
const QrCodeModal = ({ item }) => {
  const openModals = useSelector((state) => state.common.openModals);
  const { qr_data } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    dispatch(CLOSE_MODAL('QR'));
  };

  return (
    <Overlay isVisible={openModals.includes('QR')} onBackdropPress={() => toggleOverlay()} overlayStyle={styles.overlayStyle}>
      <Card style={styles.main}>
        <WingBlank size="lg">
          <Flex align="center">
            <Flex.Item>
              <Barcode value="Hello World" format="CODE128" />
            </Flex.Item>
          </Flex>
        </WingBlank>
      </Card>
    </Overlay>
  );
};

// define your styles
const styles = StyleSheet.create({
  main: {
    width: screen.width * 0.9,
    paddingHorizontal: 16,
    ...mainStyle.styles.shadow,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  overlayStyle: {
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  container: {
    ...mainStyle.styles.shadow,
    borderRadius: 8,
  },
  headerLbl: {
    fontFamily: font.regular,
    fontSize: 22,
    color: colors.green,
  },
  itemsLbl: {
    color: colors.MidGrey,
    fontFamily: font.regular,
    fontSize: 12,
  },
  divider: {
    margin: 8,
  },
});

//make this component available to the app
export default QrCodeModal;
