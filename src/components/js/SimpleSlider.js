import React, { useState } from "react";
import Slider from "react-slick";

export default function SimpleSlider({ props, setStorage, inputCityName, setInputCityName, fetchWeather }) {
  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  let storageArr = [];
  const getLocalMemory = () => {
    for (let i = 0; i < localStorage.length; i++) {
      storageArr.push(localStorage.getItem(localStorage.key(i)));
    }
  };

 const searchByHistory = (e) => {
   setInputCityName(e.target.innerText)
  fetchWeather()
  if (props.storage === false) {
    setStorage(!props.storage);
  } else if (props.storage === true) {
    setStorage(!props.storage);
  }
  
 }
  getLocalMemory();

  const clearStorage = () => {
    localStorage.clear()
    if (props.storage === false) {
      setStorage(!props.storage);
    } else if (props.storage === true) {
      setStorage(!props.storage);
    }
  }
  return (
    <div className="slider-wrapper">
      <button className={localStorage.length > 0 ? 'clearStorageBtn-active' : 'clearStorageBtn'} onClick={clearStorage}>clear all</button>
      <Slider {...settings}>
        {storageArr.map((arr, ind) => {
          if(storageArr[ind] !== "" ){
            let cityName = localStorage.getItem(localStorage.key(ind))
            
            return (
              <div key={ind} id={ind} className="visiteCard"  onClick={(e) => searchByHistory(e)}>
                <div className="visiteCard_info">
                  
                  <h2>{cityName ? cityName : "city name"}</h2>
                  <div></div>
                </div>
              </div>
            );
          } 
        })}
      </Slider>
    </div>
  );
}

