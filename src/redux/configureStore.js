import { combineReducers, createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import common from './common';
import products from './products';

const reducer = combineReducers({
  common,
  products,
});

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  blacklist: ['common', 'products'],
  //   whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
