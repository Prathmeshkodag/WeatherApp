import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import _ from 'lodash'
import { getWeatherData } from "../Redux/weatherSlice";



function WeatherApp() {
    const [cityname, setCityname] = useState('');
    const { weatherData: citydata, Loading, error } = useSelector((state) => state.cityWeather);

    const dispatchWeather = useDispatch();
    const apiKey = '25377e2efce06c17855e7c3772e931c4';

   
    
     const formatNumber=(number)=>{
           const formatedDate=new Date(number*1000);
           const hours=formatedDate.getHours();
           const minutes=formatedDate.getMinutes();
           return `${hours}:${minutes?minutes:'00'}:${minutes<=12?'am':'pm'}`
     };

     const fetchWeather=useCallback(
        _.debounce((serachcity)=>{
            if(serachcity){
            dispatchWeather(getWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${serachcity}&appid=${apiKey}`))
               
            }
        },1000),
          [] 
     )

     const selectCityName=(e)=>{
        setCityname(e.target.value);
        fetchWeather(e.target.value);

     }
     console.log(error)
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                marginTop: '3rem',
                gap: '20px',
            }}>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '30rem' } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                    value={cityname} 
                    onChange={selectCityName} 
                    id="standard-basic" 
                    label="Search City Name" 
                    variant="standard" />
                </Box>
                {error && (
                <Typography color="error" sx={{ fontSize: 16 }}>
                    Error: {error}
                </Typography>
            )}

          
            {citydata?.name && !error ? (
                <Card sx={{
                    width: '30rem',
                    backgroundImage: 'url("https://cdn.vectorstock.com/i/500p/61/67/abstract-light-blue-watercolor-for-background-vector-31686167.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', gap: '20px' }}>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>
                            City Name: {citydata?.name}
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>
                            Country: {citydata?.sys?.country}
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>
                            Temperature: {citydata?.main?.temp ? (citydata.main.temp - 273.15).toFixed(2) : "N/A"} °C
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>
                            Humidity: {citydata?.main?.humidity || "N/A"}%
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>
                            Visibility: {citydata?.visibility || "N/A"} meters
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>
                            Wind Speed: {citydata?.wind?.speed ? `${citydata.wind.speed} Km/h` : "N/A"}
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>
                            Sunrise: {formatNumber(citydata?.sys?.sunrise)}
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: 14 }}>
                            Sunset: {formatNumber(citydata?.sys?.sunset)}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                !error && (
                    <Typography gutterBottom sx={{ fontSize: 14 }}>
                        Please Enter a City Name
                    </Typography>
                )
            )}
            </div>
        </>
    )
};

export default WeatherApp;