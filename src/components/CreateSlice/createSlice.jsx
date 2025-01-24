import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

//  ------------Below function code for to get City weather Data by using AsyncThunk--------by using fetch method--------------
export const getWeatherData = createAsyncThunk(
    "weather/getWeatherData",
    async (weatherapi, { rejectWithValue }) => {
      try {
        const response = await fetch(weatherapi);
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message); // Handle errors properly
      }
    }
  );
  


// -----------------------below code for to createslice for to store city weather data from getting above API responce-----------
export const weatherSlice=createSlice({
    name:'weather',
    initialState:{
        Loading:false,
        cityweatherData:{},
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getWeatherData.pending,(state)=>{
            state.Loading=true;
            state.error=null;
        })
        .addCase(getWeatherData.fulfilled,(state,action)=>{
            state.Loading=false;
            state.cityweatherData=action.payload;
        })
        .addCase(getWeatherData.rejected,(state,action)=>{
            state.Loading=false;
            state.error=action.error.message||"Something went wrong"
        })
    }
});

export default weatherSlice.reducer;
