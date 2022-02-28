//import liraries
import { WingBlank, Card, Flex, List } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { filter, map, uniq } from 'lodash';

import colors from '../../common/constant/colors';
import font from '../../common/constant/font';
import mainStyle from '../../common/constant/mainStyle';
import screen from '../../common/constant/screen';
import { CLOSE_MODAL } from '../../redux/common';
import { SET_PRODUCTS } from '../../redux/products';

// create a component
const CategoriesModal = ({ categories }) => {
  const dispatch = useDispatch();
  const [newCategories, setNewCategories] = useState(categories ?? []);
  const openModals = useSelector((state) => state.common.openModals);
  const { products_data } = useSelector((state) => state.products);

  const toggleOverlay = () => {
    dispatch(CLOSE_MODAL('category'));
  };

  const Items = ({ item }) => (
    <View>
      <List.Item onPress={() => selectCategories(item)}>
        <Text style={styles.itemsLbl}>{item}</Text>
      </List.Item>
    </View>
  );

  const selectCategories = (item) => {
    if (item !== 'All') {
      const data = filter(products_data, { category: item });
      dispatch(SET_PRODUCTS(data));
    } else {
      // ALL
      dispatch(SET_PRODUCTS(products_data));
    }

    toggleOverlay();
  };

  useEffect(() => {
    setNewCategories(uniq(map(products_data, 'category')));
  }, [products_data]);

  return (
    <Overlay
      isVisible={openModals.includes('category')}
      onBackdropPress={() => toggleOverlay()}
      fullScreen
      overlayStyle={styles.overlayStyle}
    >
      <Card style={styles.main}>
        <WingBlank size="lg">
          <Flex align="center">
            <Flex.Item>
              <Text style={styles.headerLbl}>Category</Text>
            </Flex.Item>
            <Flex.Item style={{ alignItems: 'flex-end' }}>
              <Icon raised name="close" type="material" color={colors.green} onPress={() => toggleOverlay()} />
            </Flex.Item>
          </Flex>
        </WingBlank>
        <View>
          <List.Item onPress={() => selectCategories('All')}>
            <Text style={styles.itemsLbl}>All</Text>
          </List.Item>
        </View>
        <FlatList data={newCategories} renderItem={Items} keyExtractor={(item) => item} />
      </Card>
    </Overlay>
  );
};

// define your styles
const styles = StyleSheet.create({
  main: {
    height: screen.height / 2,
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
export default CategoriesModal;
