import React, { useEffect, useState } from "react";
import SimpleSlider from './components/js/SimpleSlider'
import FullDate from "./components/js/FullDate";
import axios from "axios";
import './components/scss/index.scss';
import "./App.scss";

function App() {


  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [data, setData] = useState({});
  const [metric, setMetric] = useState(true);
  const [iconCode, setIconCode] = useState("02d");
  const [inputCityName, setInputCityName] = useState("");
  const [storage, setStorage] = useState(false);

  let apiKey = "e8b6b71a5d9dd47038f9f1166fa01228";
  let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";


  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const fetchWeather = () => {
    window.navigator.geolocation.getCurrentPosition(savePositionToState);
    axios.get(actUrl).then((response) => {
      setData(response.data);
      setIconCode(response.data.weather[0].icon);
    });
  };



  const setLocalMemory = () => {
    localStorage.setItem((localStorage.length), (data.main ? JSON.stringify(data.name + " : " + data.main.temp.toFixed()) : null));
    if(storage === false){setStorage(!storage)}
    else if(storage === true){setStorage(!storage)}
  }

  const fetchWeatherByCity = (e) => {
    if (e.key === "Enter") {
      axios.get(actUrl).then((response) => {
        setData(response.data);
      setIconCode(response.data.weather[0].icon);
      });
    }
  };

  const unitsHandler = () => {
    setMetric(!metric);
  };
  console.log(data)
  const actUrl = `https://api.openweathermap.org/data/2.5/weather?${
    inputCityName !== ""
      ? "q=" + inputCityName
      : "lat=" + latitude + "&lon=" + longitude
  }${metric ? "&units=metric" : "&units=imperial"}&appid=${apiKey}`;

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude, metric, storage]);

  return (
    <div className="App">

      <div className="container">
        <div className={((data.main && metric && data.main.temp > 0)||(data.main && !metric && data.main.temp > 32)) ? 'current-info current-info-warm' : 'current-info current-info-cold'}>

          <div>

            <input
              className="search"
              type="text"
              value={inputCityName}
              onChange={(e) => {
                setInputCityName(e.target.value);
              }}
              onKeyPress={fetchWeatherByCity}
              placeholder=" enter yor city or zip-code"
            ></input>

          </div>

            <div className="content-wrapper">
            <h1 className="city">{data.name ? data.name : null}</h1>
          <FullDate />

          <div className="weather-info">
            <h2>
              {data.main ? data.main.temp.toFixed() : null}
              {metric ? "°С" : "°F"}
            </h2>
            <img src={iconUrl}></img>
          </div>
            </div>
          <div className="button-wrapper">
            <button className="units-handler" onClick={unitsHandler}>
              {metric ? "°F" : "°С"}
            </button>
            <button className="units-handler" onClick={setLocalMemory}>
              save
            </button>
          </div>
          
        </div>
        <div className={((data.main && metric && data.main.temp > 0)||(data.main && !metric && data.main.temp > 32)) ? 'add-info add-info-warm' : 'add-info add-info-cold'}>
          <div  className="add-content-wrapper">
          <div className="temp">
            temperature{" "}
            <span>
              {data.main ? data.main.temp.toFixed() : null}
              {metric ? "°С" : "°F"}
            </span>{" "}
            - feels like{" "}
            <span>
              {data.main ? data.main.feels_like.toFixed() : null}
              {metric ? "°С" : "°F"}
            </span>
          </div>
          <div className="clouds">{data.weather ? data.weather[0].description : null}</div>
          <div className="humidity">
            {" "}
            humidity : <span>{data.main ? data.main.humidity : null}%</span>
          </div>
          <div className="wind">
            {" "}
            wind : <span>{data.main ? data.wind.speed.toFixed() : null} </span>
            {metric ? " meters per second" : " mile per hour"}
          </div>
          </div>

        </div>
        <div className={((data.main && metric && data.main.temp > 0)||(data.main && !metric && data.main.temp > 32)) ? 'personal-info personal-info-warm' : 'personal-info personal-info-cold'}>
          <SimpleSlider props={storage} setStorage={setStorage}/>

        </div>
      </div>
    </div>
  );
}

export default App;

