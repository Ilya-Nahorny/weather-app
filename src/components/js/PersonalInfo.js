import React from "react";
import SimpleSlider from "./SimpleSlider";

export default function PersonalInfo({props, setStorage, setInputCityName, fetchWeather}) {
  return (
    <div id='personal-info'
      className={
        (props.data.main && props.metric && props.data.main.temp > 0) ||
        (props.data.main && !props.metric && props.data.main.temp > 32)
          ? "personal-info personal-info-warm"
          : "personal-info personal-info-cold"
      }
    >
      <SimpleSlider props={props} setStorage={setStorage} setInputCityName={setInputCityName} fetchWeather={fetchWeather}/>
      
    </div>
  );
}
