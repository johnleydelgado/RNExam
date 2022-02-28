//import liraries
import { WingBlank, Card, Flex } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Divider, Icon, Input, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { findIndex } from 'lodash';

import colors from '../../common/constant/colors';
import font from '../../common/constant/font';
import mainStyle from '../../common/constant/mainStyle';
import { CLOSE_MODAL } from '../../redux/common';
import { ADD_PRODUCT_TO_CART } from '../../redux/products';

// create a component
const AddCartModal = ({ product_cart }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const openModals = useSelector((state) => state.common.openModals);
  const { selected_product, product_in_cart } = useSelector((state) => state.products);

  const toggleOverlay = () => {
    dispatch(CLOSE_MODAL('add-cart'));
  };

  const quantityHandler = (type) => {
    if (type === 'add') {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    }
  };

  const addCart = () => {
    const temp = [...product_in_cart];
    const index = findIndex(temp, { id: selected_product.id });
    if (index !== -1) {
      let obj = { ...temp[index], quantity };
      temp.splice(index, 1, obj);
      dispatch(ADD_PRODUCT_TO_CART(temp));
    } else {
      let obj = { ...selected_product, quantity };
      temp.push(obj);
      dispatch(ADD_PRODUCT_TO_CART(temp));
    }
    toggleOverlay();
  };

  useEffect(() => {
    if (openModals.includes('add-cart')) {
      setQuantity(1);
    }
  }, [openModals]);

  return (
    <Overlay
      isVisible={openModals.includes('add-cart')}
      onBackdropPress={() => toggleOverlay()}
      fullScreen
      overlayStyle={styles.overlayStyle}
    >
      <Card style={styles.main}>
        <WingBlank size="lg">
          <Flex align="center">
            <Flex.Item>
              <Text style={styles.headerLbl}>Add to Cart</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Avatar size={100} rounded icon={{ name: 'store', type: 'material' }} containerStyle={{ backgroundColor: colors.green }} />
                <View style={{ padding: 8 }}>
                  <Text style={styles.priceLbl}>₱ {selected_product.price}</Text>
                  <Text style={styles.productDetailsLbl}>{selected_product.display_name}</Text>
                  <Text style={styles.productDetailsLbl}>({selected_product.brand})</Text>
                </View>
              </View>
            </Flex.Item>
            <Flex.Item style={{ alignItems: 'flex-end' }}>
              <Icon raised name="close" type="material" color={colors.green} onPress={() => toggleOverlay()} />
            </Flex.Item>
          </Flex>
          <Flex justify="center">
            <Flex.Item>
              <Text style={styles.quantityLbl}>Quantity: </Text>
            </Flex.Item>
            <Flex.Item style={{ alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ left: 10, borderRadius: 2, backgroundColor: colors.green, width: 35, height: 30, justifyContent: 'center' }}>
                <Icon name="minus" type="font-awesome" size={20} onPress={() => quantityHandler('minus')} color={colors.LightAccent} />
              </View>
              <Input
                value={String(quantity)}
                inputContainerStyle={styles.quantityStyle}
                containerStyle={{ height: 30, width: 35 }}
                inputStyle={{ padding: 2, fontFamily: font.regular, fontSize: 12, textAlign: 'center' }}
              />
              <View style={{ left: 10, borderRadius: 2, backgroundColor: colors.green, width: 35, height: 30, justifyContent: 'center' }}>
                <Icon name="plus" type="font-awesome" size={20} onPress={() => quantityHandler('add')} color={colors.LightAccent} />
              </View>
            </Flex.Item>
          </Flex>
          <Divider style={styles.divider} />
          <Button
            title="Add to cart"
            buttonStyle={{ backgroundColor: colors.green }}
            containerStyle={{ padding: 16 }}
            onPress={() => addCart()}
          />
        </WingBlank>
      </Card>
    </Overlay>
  );
};

// define your styles
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 4,
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
    paddingVertical: 12,
  },
  priceLbl: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.orange,
  },
  productDetailsLbl: {
    fontFamily: font.regular,
    fontSize: 12,
    color: colors.MidGrey,
  },
  quantityLbl: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.MidGrey,
  },
  itemsLbl: {
    color: colors.MidGrey,
    fontFamily: font.regular,
    fontSize: 12,
  },
  divider: {
    margin: 8,
  },
  quantityStyle: {
    borderColor: colors.MidGrey,
    borderWidth: 0.5,
    borderRadius: 2,
    borderBottomWidth: 0.5,
    width: 35,
    height: 30,
  },
});
//make this component available to the app
export default AddCartModal;
