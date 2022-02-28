//import liraries
import { WingBlank, Card, Flex, List } from '@ant-design/react-native';
import { findIndex, sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Avatar, Divider, Icon, Input, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../common/constant/colors';
import font from '../../common/constant/font';
import mainStyle from '../../common/constant/mainStyle';
import screen from '../../common/constant/screen';
import { CLOSE_MODAL } from '../../redux/common';
import { ADD_PRODUCT_TO_CART, SET_PRODUCTS } from '../../redux/products';

// create a component
const ListCardModal = () => {
  const dispatch = useDispatch();
  const openModals = useSelector((state) => state.common.openModals);
  const [total, setTotal] = useState(0);
  const { product_in_cart } = useSelector((state) => state.products);

  const toggleOverlay = () => {
    dispatch(CLOSE_MODAL('cart'));
  };

  const Items = ({ item }) => (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
        <Avatar size={60} rounded icon={{ name: 'store', type: 'material' }} containerStyle={{ backgroundColor: colors.green }} />
        <View style={{ padding: 8 }}>
          <Text style={styles.priceLbl}>₱ {(item.quantity * item.price).toFixed(2)}</Text>
          <Text style={styles.productDetailsLbl}>{item.display_name}</Text>
          <Text style={styles.productDetailsLbl}>({item.brand})</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '50%' }}>
              <Text style={styles.quantityLbl}>Quantity: {item.quantity}</Text>
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', width: '50%' }}>
              <TouchableOpacity
                style={{ left: 10, borderRadius: 2, backgroundColor: colors.green, width: 35, height: 30, justifyContent: 'center' }}
                onPress={() => quantityHandler('minus', item)}
              >
                <Icon name="minus" type="font-awesome" size={20} color={colors.LightAccent} />
              </TouchableOpacity>
              <Input
                value={String(item.quantity)}
                inputContainerStyle={styles.quantityStyle}
                containerStyle={{ height: 30, width: 35 }}
                inputStyle={{ padding: 2, fontFamily: font.regular, fontSize: 12, textAlign: 'center' }}
              />
              <TouchableOpacity
                style={{ left: 10, borderRadius: 2, backgroundColor: colors.green, width: 35, height: 30, justifyContent: 'center' }}
                onPress={() => quantityHandler('add', item)}
              >
                <Icon name="plus" type="font-awesome" size={20} color={colors.LightAccent} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Divider />
    </>
  );

  const quantityHandler = (type, product) => {
    if (type === 'add') {
      const temp = [...product_in_cart];
      const index = findIndex(temp, { id: product.id });
      let obj = { ...temp[index] };
      obj.quantity = product.quantity + 1;
      temp.splice(index, 1, obj);
      dispatch(ADD_PRODUCT_TO_CART(temp));
    } else {
      if (product.quantity > 0) {
        const temp = [...product_in_cart];
        const index = findIndex(temp, { id: product.id });
        let obj = { ...temp[index] };
        obj.quantity = product.quantity - 1;
        temp.splice(index, 1, obj);
        dispatch(ADD_PRODUCT_TO_CART(temp));
      }
    }
  };

  // console.log(sumBy(product_in_cart, 'price'), sumBy(product_in_cart, 'quantity'), product_in_cart);
  useEffect(() => {
    const totalArr = product_in_cart.reduce((acc, value, index) => {
      acc.push({ total: value.price * value.quantity });
      return acc;
    }, []);
    setTotal(sumBy(totalArr, 'total'));
  }, [product_in_cart]);
  return (
    <Overlay isVisible={openModals.includes('cart')} onBackdropPress={() => toggleOverlay()} fullScreen overlayStyle={styles.overlayStyle}>
      <Card style={styles.main}>
        <WingBlank size="lg">
          <Flex align="center">
            <Flex.Item>
              <Text style={styles.headerLbl}>Cart</Text>
            </Flex.Item>
            <Flex.Item style={{ alignItems: 'flex-end' }}>
              <Icon raised name="close" type="material" color={colors.green} onPress={() => toggleOverlay()} />
            </Flex.Item>
          </Flex>
        </WingBlank>
        <FlatList data={product_in_cart} renderItem={Items} keyExtractor={(item) => item.id} />
        <WingBlank size="lg" style={{ padding: 12 }}>
          <Flex align="center">
            <Flex.Item>
              <Text style={styles.totalLbl}>TOTAL: </Text>
            </Flex.Item>
            <Flex.Item style={{ alignItems: 'flex-end' }}>
              <Text style={styles.totalLbl2}>₱ {total.toFixed(2)}</Text>
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
    height: screen.height / 2,
    paddingHorizontal: 6,
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
  priceLbl: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.Dark,
  },
  productDetailsLbl: {
    fontFamily: font.regular,
    fontSize: 12,
    color: colors.MidGrey,
  },
  quantityLbl: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.orange,
  },
  quantityStyle: {
    borderColor: colors.MidGrey,
    borderWidth: 0.5,
    borderRadius: 2,
    borderBottomWidth: 0.5,
    width: 35,
    height: 30,
  },
  totalLbl: {
    fontFamily: font.regular,
    fontSize: 22,
    color: colors.Dark,
  },
  totalLbl2: {
    fontFamily: font.regular,
    fontSize: 22,
    color: colors.orange,
  },
});
//make this component available to the app
export default ListCardModal;
