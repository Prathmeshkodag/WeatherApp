import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'



export const getWeatherData=createAsyncThunk(
    'weather/getWeatherData',
    async(api,{ rejectWithValue })=>{
        try{
          const response=await fetch(api)
          if (!response.ok) {
            throw new Error(`City Not Found`);
        }
          const weatherData=await response.json()

          return weatherData
        }catch(error){
            return rejectWithValue('City Not Found');
        }
    }
)

export const weatherSlice=createSlice({
    name:"weather",
    initialState:{
        Loading:false,
        weatherData:{},
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getWeatherData.pending,(state)=>{
            state.Loading=true
            state.error=null
        })
        .addCase(getWeatherData.fulfilled,(state,action)=>{
            state.Loading=false
            state.weatherData=action.payload
            state.error=null
        })
        .addCase(getWeatherData.rejected,(state,action)=>{
            state.Loading=false
            state.error=action.payload||'Something went wrong'
        })
    }
})

export default weatherSlice.reducer
