import {configureStore} from '@reduxjs/toolkit';
import searchedCityReducer from './slice';

const store = configureStore({
  reducer: {
    searchedCities: searchedCityReducer,
  },
}); 

export type RootState = ReturnType<typeof store.getState>;

export default store;