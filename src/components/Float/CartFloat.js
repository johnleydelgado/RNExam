//import liraries
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../common/constant/colors';
import mainStyle from '../../common/constant/mainStyle';
import screen from '../../common/constant/screen';
import { OPEN_MODAL } from '../../redux/common';
const HEADER_HEIGHT = 55;
// create a component
const CartFloat = ({ translation }) => {
  const dispatch = useDispatch();
  const { product_in_cart } = useSelector((state) => state.products);

  const openModal = () => {
    dispatch(OPEN_MODAL('cart'));
    return false;
  };

  return (
    <TouchableOpacity style={styles.main} onPress={() => openModal()}>
      <Icon name="shopping-cart" type="font-awesome" color="black" />
      <Badge
        status="primary"
        value={product_in_cart.length}
        containerStyle={{ position: 'absolute', top: 1, left: 24 }}
        badgeStyle={{ backgroundColor: colors.orange }}
      />
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    zIndex: 1000,
    width: 40,
    height: 40,
    backgroundColor: colors.LightAccent,
    borderRadius: 64,
    right: 16,
    bottom: 64,
    alignItems: 'center',
    justifyContent: 'center',
    ...mainStyle.styles.shadow,
  },
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
export default CartFloat;
