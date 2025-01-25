import {configureStore} from '@reduxjs/toolkit'
import weatherReducer from '../Redux/weatherSlice'

export const store=configureStore({
    reducer:{
        cityWeather:weatherReducer,
    }
})
