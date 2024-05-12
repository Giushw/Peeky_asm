import {createSlice} from '@reduxjs/toolkit';
import {CurrentUnit} from '../types/response';

export interface City {
  id: string; 
  name: string;
}

const initialState: { cities: City[], currentUnit: CurrentUnit, isSearching: boolean } = {
  cities: [],
  currentUnit: 'm',
  isSearching: false
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
  },
});

export const {addCity, removeCity, updateUnit, updateIsSearching} = searchedCitiesSlice.actions;
export default searchedCitiesSlice.reducer;