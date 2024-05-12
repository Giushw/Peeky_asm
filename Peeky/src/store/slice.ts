import {createSlice} from '@reduxjs/toolkit';
import {CurrentUnit} from '../types/response';

export interface City {
  id: string; 
  name: string;
}

const initialState: { 
  cities: City[], 
  currentUnit: CurrentUnit, 
  isSearching: boolean 
  backdropCode: number
} = {
  cities: [],
  currentUnit: 'm',
  isSearching: false,
  backdropCode: 0
};

const searchedCitiesSlice = createSlice({
  name: 'searchedCities',
  initialState,
  reducers: {
    addCity(state, action: { payload: City }) {
      state.cities.push(action.payload);
    },
    removeCity(state, action: { payload: { id: string } }) {
      const index = state.cities.findIndex(city => city.id === action.payload.id);

      if (index !== -1) {
        state.cities.splice(index, 1);
      }
    },
    updateUnit(state, action: {payload: CurrentUnit}) {
      state.currentUnit = action.payload;
    },
    updateIsSearching(state, action: {payload: boolean}) {
      state.isSearching = action.payload;
    },
    updateBackdropCode(state, action: {payload: number}) {
      state.backdropCode = action.payload;
    },
  },
});

export const {
  addCity,
  removeCity,
  updateUnit,
  updateIsSearching,
  updateBackdropCode
} = searchedCitiesSlice.actions;
export default searchedCitiesSlice.reducer;