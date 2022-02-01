import React, { useEffect, useState } from "react";
import axios from "axios";
import "./components/scss/index.scss";
import "./App.scss";
import CurrentInfo from "./components/js/CurrentInfo";
import AddInfo from "./components/js/AddInfo";
import PersonalInfo from "./components/js/PersonalInfo";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [data, setData] = useState({});
  const [metric, setMetric] = useState(true);
  const [iconCode, setIconCode] = useState("02d");
  const [inputCityName, setInputCityName] = useState("");
  const [storage, setStorage] = useState(false);

  let apiKey = "e8b6b71a5d9dd47038f9f1166fa01228";

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
    localStorage.setItem(
      data.name,
      data.main 
        ?  data.name
        : null
    );
    if (storage === false) {
      setStorage(!storage);
    } else if (storage === true) {
      setStorage(!storage);
    }
  };

  const fetchWeatherByCity = (e) => {
    if (e.key === "Enter") {
      axios.get(actUrl).then((response) => {
        setData(response.data);
        setIconCode(response.data.weather[0].icon);
      });
      e.target.value = "";
    }
  };

  const unitsHandler = () => {
    setMetric(!metric);
  };
  
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
      <div
        className={
          (data.main && metric && data.main.temp > 0) ||
          (data.main && !metric && data.main.temp > 32)
            ? "container container-warm"
            : "container container-cold"
        }
      >
        <CurrentInfo
          props={{ data, metric, inputCityName, iconCode }}
          setInputCityName={setInputCityName}
          fetchWeatherByCity={fetchWeatherByCity}
          unitsHandler={unitsHandler}
          setLocalMemory={setLocalMemory}
        />
        <AddInfo props={{ data, metric}}/>
        <PersonalInfo props={{storage, data, metric}} setInputCityName={setInputCityName} setStorage={setStorage} fetchWeather={fetchWeather}/>
      </div>
    </div>
  );
}

export default App;

/* const actUrl = `https://api.openweathermap.org/data/2.5/weather?${
  inputCityName !== ""
    ? "q=" + inputCityName
    : "lat=" + latitude + "&lon=" + longitude
}${metric ? "&units=metric" : "&units=imperial"}&appid=${apiKey}`; */
