import {createSlice} from '@reduxjs/toolkit';

export interface City {
  id: string; // Assuming city has a unique string id
  name: string;
}

const initialState: { cities: City[] } = {
  cities: [],
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
  },
});

export const { addCity, removeCity } = searchedCitiesSlice.actions;
export default searchedCitiesSlice.reducer;