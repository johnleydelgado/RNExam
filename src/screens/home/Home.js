import { Animated, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import WingBlank from '@ant-design/react-native/lib/wing-blank';
import { map, uniq, isEmpty } from 'lodash';
import axios from 'axios';
import styles from './Style';
import LottieView from 'lottie-react-native';
import screen from '../../common/constant/screen';
import StoreInfoCard from '../../components/Cards/StoreInfoCard';
import ProductCard from '../../components/Cards/ProductCard';
import CommonLoading from '../../components/Loading/CommonLoading';
import CommonFloat from '../../components/Float/CommonFloat';
import CategoriesModal from '../../components/Modal/CategoriesModal';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CONSTANT_PRODUCTS, SET_PRODUCTS } from '../../redux/products';
import QrCodeModal from '../../components/Modal/QrCodeModal';
import CartFloat from '../../components/Float/CartFloat';
import { ActivityIndicator } from '@ant-design/react-native';
import AddCartModal from '../../components/Modal/AddCartModal';
import ListCardModal from '../../components/Modal/ListCardModal';
export default function Home() {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const { products } = useSelector((state) => state.products);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [100, 130],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios('https://assetsmdr.fra1.digitaloceanspaces.com/json/Products.json');
        dispatch(SET_PRODUCTS(result?.data));
        dispatch(SET_CONSTANT_PRODUCTS(result?.data));
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, [dispatch]);

  // useEffect(() => {
  //   const scrollToTop = () => {
  //     scrollRef.current?.scrollTo({
  //       y: 0,
  //       animated: true,
  //     });
  //   };
  // }, []);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const lastScroll = () => {
    setLoading(true);
    setRowsPerPage(rowsPerPage + 1);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(function () {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  const category = uniq(map(products, 'category'));
  return (
    <>
      {isEmpty(category) ? (
        <CommonLoading />
      ) : (
        <SafeAreaView style={styles.main} forceInset={{ top: 'always' }}>
          <CommonFloat translation={translation} />
          <AddCartModal />
          <CartFloat />
          <CategoriesModal categories={category} />
          <QrCodeModal />
          <ListCardModal />
          <Animated.ScrollView
            ref={scrollRef}
            onScroll={({ nativeEvent }) => {
              scrolling.setValue(nativeEvent.contentOffset.y);
              if (isCloseToBottom(nativeEvent)) {
                if (!loading) {
                  lastScroll();
                }
              }
            }}
            scrollEventThrottle={16}
          >
            <WingBlank size="lg" style={styles.lottie_header}>
              <LottieView
                source={require('../../common/assets/lottie/lottie-store.json')}
                autoPlay
                loop
                style={{ width: screen.width, height: screen.height * 0.2 }}
              />
            </WingBlank>
            <StoreInfoCard />
            {category.splice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <ProductCard item={item} key={item} />
            ))}
            {loading && <ActivityIndicator />}
          </Animated.ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
