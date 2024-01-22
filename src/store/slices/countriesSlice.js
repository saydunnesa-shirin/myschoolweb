import { createSlice } from '@reduxjs/toolkit';

import { fetchCountries, addCountry, updateCountry, removeCountry } from '../thunks/countriesThunks';

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null,
    },
    reducers: {
      changeCountriesSearchTerm(state, action) {
        state.searchTerm = action.payload;
        if(state.searchTerm.length !== 0)
          state.currentPage = 1;
      },
      onNavigateNext: (state) => {
        state.currentPage++;
      },
      onNavigatePrev: (state) => {
        state.currentPage--;
      },
      onChangeTodosPerpage: (state, action) => {
        state.dataPerPage = action.payload;
      },
      onClickCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      }
    },
    extraReducers(builder){
    //Fetch
    builder.addCase(fetchCountries.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = sortDataByName(action.payload);
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Add
    builder.addCase(addCountry.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
    });
    builder.addCase(addCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Update
    builder.addCase(updateCountry.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(Country => {

          if(Country.id === action.payload.id){
            return {
              id: action.payload.id,
              name: action.payload.name}
          }
          return Country;
        });

    });
    builder.addCase(updateCountry.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error;
    });

    //Remove
    builder.addCase(removeCountry.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeCountry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(Country => {
        return Country.id !== action.payload.id
      });
    });
    builder.addCase(removeCountry.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

function sortDataByName (dataList){
  const sortedData = [...dataList].sort((a, b) => {
    const valueA = a.name;
    const valueB = b.name;
    // const reverseOrder = sortOrder === 'asc' ? 1 : -1;

    if (typeof valueA === 'string') {
      return valueA.localeCompare(valueB);
    } else {
      return (valueA - valueB);
    }
  });

  return sortedData;

}

export const CountriesAction = countriesSlice.actions;

export const countriesReducer = countriesSlice.reducer;