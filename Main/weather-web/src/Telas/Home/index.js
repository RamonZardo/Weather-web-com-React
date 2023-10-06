import React, { useEffect, useState } from "react";
import './home.css'

import { BsSearch, BsSun, BsFillCloudRainHeavyFill, BsCloudSunFill } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { FaDroplet, FaWind } from "react-icons/fa6";

import { apiKey } from "../../ConfigApi"; 
import axios from "axios";




export default function Home() {
    const [city, setCity] = useState ('');
    const [ temperature, setTemperature ] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind]= useState('');
    const [foundCity, setFoundCity] = useState('');
    const [ tempMin, setTempMin] = useState('');
    const [ tempMax, setTemax] = useState('');
    const [weatherDescription, setWeatherDescription] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    
    
    
    

    const fetchWeatherData  = () => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(apiUrl)
        .then( Response=>{
            const { main, wind, weather} = Response.data;
            setTemperature(main.temp)
            setTemax(main.temp_max)
            setTempMin(main.temp_min)
            setHumidity(main.humidity)
            setWind(wind.speed);
            setFoundCity(city);
            setWeatherDescription(weather[0].main);
            setDataLoaded(true);
           
        
        })
        .catch(error=>{
            console.error('erro ao buscar os dados da previsão do tempo ', error)
            console.error(alert('Erro ao encontrar cidade'))
            setFoundCity('');
            

        })

        
    }  

    const handleSearch = () =>{
        fetchWeatherData()
    }

    const weatherIcons = {
        "Clear": <BsSun size={75} color="orange" />,
        "Clouds": <BsCloudSunFill size={75} color="white" />,
        "Rain": <BsFillCloudRainHeavyFill size={75} color="blue" />,
        
    };

    

   

    return (
        
        <div className="container">

           
            <div>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Procure sua cidade"
                    value={city}
                    onChange={(val)=>setCity(val.target.value)}
                    
                
                />
                

                <div className="container-scearch" onClick={handleSearch}>
                    <button className="scearchButton">
                        <BsSearch
                            size={25}
                        />
                        
                    </button>
                </div>
            </div>

            {dataLoaded? (

                <div className={`weather-data ${dataLoaded ? 'animate-up' : ''}`}>  
                    <h2>
                        <ImLocation size={20} color="white"/>
                        <span className="city-name"> {foundCity} </span>
                    </h2>
                    <div style={{marginTop: 30}}>
                        {weatherIcons[weatherDescription]}
                    
                    </div>

                    <p className="temperature-text"> <span>{Math.round(temperature)}</span>&deg;C</p>

                </div>
            ): null}

            {dataLoaded ? (
                <div>
                    <div className={`card-conteiner ${dataLoaded ? 'animate-up' : ''}`}>  
                        <p className="humity ">
                            <FaDroplet size={30} color="white" style={{marginTop:7, marginLeft:10}} />
                            <span style={{marginLeft: 180}}>{humidity} %</span>
                        </p>
                    </div>
                    <div className={`card-conteiner ${dataLoaded ? 'animate-up' : ''}`}>
                        <p className="wind">
                            <FaWind size={30} color="white" style={{marginTop:7, marginLeft:10}} />
                            <span style={{marginLeft: 180}}>{Math.round(wind)} km/h</span>
                        </p>
                    </div>
                    <div className={`card-conteiner ${dataLoaded ? 'animate-up' : ''}`}>
                        <p className="Temp-Max">
                            <span style={{marginLeft: 5}}>MAX</span>
                            <span style={{marginLeft: 180, fontSize: 20}}>{Math.round(tempMax)}</span>&deg;C
                        </p>
                    </div>
                    <div className={`card-conteiner ${dataLoaded ? 'animate-up' : ''}`}>
                        <p className="Temp-Min">
                            <span style={{marginLeft: 5}}>MIN </span>
                            <span style={{marginLeft: 180, fontSize: 20}}>{Math.round(tempMin)}</span>&deg;C
                        </p>
                    </div>
                </div>
            ) : null}
                    
    
    </div>
    
    )
}