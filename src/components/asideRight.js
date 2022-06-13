import React,{useEffect, useState} from 'react';
import axios from 'axios';
import 'weather-icons-master/css/weather-icons.css';

const AsideRight = () => {
    const [currLocData, setCurLocData] = useState({
        city: '',
        state: '',
        country: ''
    })
    const [currLocWeatherCond, setCurrLocWeatherCond] =useState({
        weather:[{id:'',description:''}],
        main: {temp:'',temp_min:'',temp_max:''}
    });
    const [localTime, setLocalTime] = useState(new Date().toLocaleDateString());
    const fetchData= async (city) => {
        const currWeatherApi=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=107a420b6f4b7dd8c2243eb7a310e6fe`;
        const res=await axios.get(currWeatherApi)
        setCurrLocWeatherCond({
            weather:res.data.weather, main:res.data.main
        })
    }
    useEffect(() => {
        const currentLocationAPI = 'https://extreme-ip-lookup.com/json/?key=f7Zqeoj2J8Z7gO4DtcYg';
        axios.get(currentLocationAPI).then(res => {
            fetchData(res.data.city);
            setCurLocData({
                city: res.data.city,
                state: res.data.region,
                country: res.data.countryCode
            })
        })   
    }, [])
    useEffect(() => {
        let timer = setInterval(() => {
            setLocalTime(new Date().toLocaleTimeString())
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, [])
    const convertCtoF = (temp) => {
        return Math.floor((temp - 273.15));
      };
    
      const minMaxTemp = (min, max) => {
        return (
          <h6>
            <span>Low: {convertCtoF(min)}&deg;</span>
            {' - '}
            <span>High: {convertCtoF(max)}&deg;</span>
          </h6>
        );
      };

    const {city, state, country} = currLocData;
    const { temp_min, temp_max, temp} = currLocWeatherCond.main;
    const {description, id} = currLocWeatherCond.weather[0];
    const customCl = `wi wi-owm-${id} display-1`;
  return (
    <aside>
        <h3 className='localWeather'>Local Weather</h3>
        <div className='currentLocation'>
            <span>{city}</span>
            <br />
            <span>{state}</span>
            {', '}
            <span>{country}</span>
            <i className={customCl}></i>
            <h1>{convertCtoF(temp)}&deg;</h1>
            {minMaxTemp(temp_min, temp_max)}
            <h4>{description}</h4>
        </div>
        <div>
            <strong>Local Time: </strong>{localTime}
        </div>
    </aside>
  )
}

export default AsideRight