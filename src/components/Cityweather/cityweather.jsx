import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData } from "../CreateSlice/createSlice";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import _ from 'lodash';

function CityWeather() {
    const [cityName, setCityName] = useState('');
    const dispatch = useDispatch();
    const weatherdata = useSelector((state) => state.weatherData);
    const apikey = '25377e2efce06c17855e7c3772e931c4';
   
    // ---- use fo debounce function for to search API call----
    const handelSearchWeather=useCallback(
        _.debounce((searchcity) => {
            dispatch(getWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=${apikey}`));
        },500),
        []
    )

    const handelChange=(e)=>{
        setCityName(e.target.value);
        handelSearchWeather(e.target.value);
    }
   
    
    

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
                flexDirection: 'column',
                padding: '20px'
            }}>
                <Typography variant="button" gutterBottom sx={{ display: 'block' }}>
                    Weather Application
                </Typography>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '30rem' } }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField 
                    value={cityName}
                     onChange={handelChange} 
                     id="standard-basic"
                      label="Search City" 
                      variant="standard" />
                </Box>
            </div>
        </>
    )
}

export default CityWeather;

