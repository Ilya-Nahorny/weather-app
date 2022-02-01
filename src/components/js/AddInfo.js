import React from "react";

export default function AddInfo({ props }) {
  return (
    <div
      id="add-info"
      className={
        (props.data.main && props.metric && props.data.main.temp > 0) ||
        (props.data.main && !props.metric && props.data.main.temp > 32)
          ? "add-info add-info-warm"
          : "add-info add-info-cold"
      }
    >
      <div className="add-content-wrapper">
        <div className="temp">
          <span>
            {props.data.main ? props.data.main.temp.toFixed() : null}
            {props.metric ? "°С" : "°F"}
          </span>{" "}
          feels like{" "}
          <span>
            {props.data.main ? props.data.main.feels_like.toFixed() : null}
            {props.metric ? "°С" : "°F"}
          </span>
        </div>
        <div className="clouds">
          {props.data.weather ? props.data.weather[0].description : null}
        </div>
        <div className="humidity">
          {" "}
          humidity :{" "}
          <span>{props.data.main ? props.data.main.humidity : null}%</span>
        </div>
        <div className="wind">
          <span>
            {props.data.main ? props.data.wind.speed.toFixed() : null}{" "}
          </span>
          {props.metric ? " meters per second" : " mile per hour"}
        </div>
      </div>
    </div>
  );
}
