import axios from 'axios';
import React from 'react'
import { useState } from 'react'


const AsideLeft = () => {
    const [searchValue, setSearchValue] = useState('');
    const [tempType, setTempType] = useState('celcuis');
    const [showResult, setShowResult] = useState(false);
    const [weatherData, setWeatherData] = useState({
        weather: [{id: '', description: ''}],
        main: {temp: '', temp_min: '', temp_max: ''},
        name: '',
        sys: {country: ''}
    })
    const convertCtoF = (temp,type) => {
        return type === 'fahrenheit' ? Math.floor(((temp - 273.15) * 9) / 5 + 32) : Math.floor(temp - 273.15);
    }
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(searchValue !== '') {
            const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=107a420b6f4b7dd8c2243eb7a310e6fe`;

            axios.get(weatherAPI).then(res => {
                setShowResult(true);
                setWeatherData({
                    weather: res.data.weather,
                    main: res.data.main,
                    name: res.data.name,
                    sys: res.data.sys
                })
            })
        }
    }
    const handleTempTypeChange = (e) => {
        setTempType(e.target.value);
    }
    
  return (
    <aside>
        <input type="text" id='search' placeholder='Enter city...' onChange={handleSearch}  />
        <form onSubmit={handleFormSubmit}>
            <input checked={tempType==='fahrenheit'} type="radio" onChange={handleTempTypeChange} id='fahrenheit' name='degree' value='fahrenheit' />
            <label htmlFor="fahrenheit">Fahrenheit</label>
            <br />
            <input onChange={handleTempTypeChange} type="radio" id='celsius' name='degree' value='celsuis' /> {' '}
            <label htmlFor="celcuis">Celsius</label>
            <br />
            <input type="submit" id='submit' value='submit' />
        </form>
        {showResult && (
            <section className='searchResult'>
                <i className={`wi wi-owm-&{weatherData.weather[0].id} display-1`}></i>
                <span>
                    {weatherData.name}, {weatherData.sys.country}
                </span>
                <h3>{convertCtoF(weatherData.main.temp, tempType)}&deg;</h3>
                <h6>
                    <span>
                        Low: {convertCtoF(weatherData.main.temp_min, tempType)}&deg;
                    </span>
                    {' - '}
                    <span>
                        High: {convertCtoF(weatherData.main.temp_max, tempType)}&deg;
                    </span>
                </h6>
                <h4>{weatherData.weather[0].description}</h4>
            </section>
        )}
    </aside>
     )
}

export default AsideLeft