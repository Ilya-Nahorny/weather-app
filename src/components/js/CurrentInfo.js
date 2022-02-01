import React from "react";
import FullDate from "./FullDate";

export default function CurrentInfo({
  props,
  setInputCityName,
  fetchWeatherByCity,
  unitsHandler,
  setLocalMemory,
}) {
  let iconUrl =
    "http://openweathermap.org/img/w/" +
    (props.iconCode ? props.iconCode : null) +
    ".png";
  return (
    <div
      id="current-info"
      className={
        (props.data.main && props.metric && props.data.main.temp > 0) ||
        (props.data.main && !props.metric && props.data.main.temp > 32)
          ? "current-info current-info-warm"
          : "current-info current-info-cold"
      }
    >
      <div>
        <input
          className="search"
          type="text"
          value={props.inputCityName}
          onChange={(e) => {
            setInputCityName(e.target.value);
          }}
          onKeyPress={fetchWeatherByCity}
          placeholder="enter yor city or zip-code"
        ></input>
      </div>

      <div className="content-wrapper">
        <h1 className="city">{props.data.name ? props.data.name : null} </h1>
        <FullDate />

        <div className="weather-info">
          <h2>
            {props.data.main ? props.data.main.temp.toFixed() : null}
            {props.metric ? "°С" : "°F"}
          </h2>
          <img src={iconUrl}></img>
        </div>
      </div>
      <div className="button-wrapper">
        <button className="units-handler" onClick={unitsHandler}>
          {props.metric ? "°F" : "°С"}
        </button>
        <button className="units-handler" onClick={setLocalMemory}>
          save
        </button>
      </div>
    </div>
  );
}
