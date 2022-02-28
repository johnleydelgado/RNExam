//import liraries
import { Flex, WingBlank, Card } from '@ant-design/react-native';
import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Avatar, Chip } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { filter } from 'lodash';

import colors from '../../common/constant/colors';
import font from '../../common/constant/font';
import mainStyle from '../../common/constant/mainStyle';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_MODAL } from '../../redux/common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SET_QR, SET_SELECTED_PRODUCT } from '../../redux/products';

// create a component
const ProductCard = ({ item }) => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const openQrModal = (obj) => {
    dispatch(SET_QR(obj));
    dispatch(OPEN_MODAL('QR'));
  };

  const addCart = (selectedItem) => {
    dispatch(SET_SELECTED_PRODUCT(selectedItem));
    dispatch(OPEN_MODAL('add-cart'));
  };
  return (
    <View style={styles.container}>
      <WingBlank size="lg">
        <Text style={styles.storeLbl}>{item}</Text>
        <Flex wrap="wrap">
          {filter(products, { category: item }).map((row) => (
            <Card style={styles.itemContainerCard} key={row.id}>
              <TouchableOpacity onPress={() => addCart(row)}>
                <View style={styles.item}>
                  <Avatar
                    size={100}
                    rounded
                    icon={{ name: 'store', type: 'material' }}
                    containerStyle={{ backgroundColor: colors.green }}
                  />
                  <Text style={styles.productLbl}>{row.display_name}</Text>
                  <Text style={styles.productLbl}>({row.brand})</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.qrAndPriceContent}>
                <Text style={styles.priceLbl}>Php: {row.price}</Text>
                <Chip
                  onPress={() => openQrModal(row)}
                  icon={{ name: 'qrcode', type: 'font-awesome', color: 'black', size: 20 }}
                  buttonStyle={{ backgroundColor: colors.LightAccent, padding: 2 }}
                />
              </View>
            </Card>
          ))}
        </Flex>
      </WingBlank>
      <Divider style={styles.divider} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
  },
  storeLbl: {
    fontFamily: font.regular,
    fontSize: 24,
    color: colors.MidGrey,
    paddingTop: 8,
  },
  divider: {
    margin: 8,
  },
  productLbl: {
    fontFamily: font.regular,
    fontSize: 10,
    paddingTop: 8,
    color: colors.MidGrey,
    textAlign: 'center',
  },
  priceLbl: {
    fontFamily: font.regular,
    fontSize: 14,
    paddingTop: 2,
    color: colors.orange,
  },
  itemContainer: {
    paddingTop: 12,
  },
  itemContainerCard: {
    margin: 8,
    width: '45%',
    paddingTop: 8,
    borderRadius: 8,
    backgroundColor: colors.LightAccent,
    ...mainStyle.styles.shadow,
  },
  item: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  qrAndPriceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
});

//make this component available to the app
export default ProductCard;
