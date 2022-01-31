import React, { useState } from "react";
import Slider from "react-slick";

export default function SimpleSlider({ props, setStorage }) {
  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const [state, setState] = useState([])
    
  const removeItem1 = id => {
     setState(prevState => prevState.filter(el => el.id !== id))
  }
  
  
  let storageLength = localStorage.length;
  let storageArr = [];
  const getLocalMemory = () => {
    for (let i = 0; i < storageLength; i++) {
      storageArr.push(localStorage.getItem(localStorage.key(i)));
      
    }
    console.log(storageArr)
  };

  const removeCard = (e) => {
    
    console.log(e.currentTarget)
    if (props === false) {
      setStorage(!props);
    } else if (props === true) {
      setStorage(!props);
    }
  };
  getLocalMemory();

  const clearStorage = () => {
    localStorage.clear()
    if (props === false) {
      setStorage(!props);
    } else if (props === true) {
      setStorage(!props);
    }
  }
  return (
    <div className="slider-wrapper">
      <button className="clearStorage" onClick={clearStorage}>Clear All</button>
      <Slider {...settings}>
        {storageArr.map((arr, ind) => {
          if(storageArr[ind] !== "" ){
            return (
              <div key={ind} id={ind} className="visiteCard" >
                <div className="visiteCard_info">
                  <h1>{localStorage.getItem(ind)}</h1>
                  {/* <button
                    className="delCard"
                    onClick={(e) => {
                      localStorage.removeItem(ind);
                      storageArr.removeItem1(ind)
                      removeItem1(ind)
                      removeCard()
                    }}
                  >
                    delete
                  </button> */}
                </div>
              </div>
            );
          } /* else if(storageArr.length < 1){
            return ""
          } */
          
        })}
      </Slider>
    </div>
  );
}

/* export default class SimpleSlider extends Component {
  render() {
    const settings = {
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    let storageLength = localStorage.length;
    let storageArr = ['', '', ''];
    const getLocalMemory = () => {
      for (let i = 0; i < storageLength; i++) {
        storageArr.push(localStorage.getItem(localStorage.key(i)));
      }
    };

    const removeCard = (e) => {
      
    }
    console.log(storageArr)
    getLocalMemory();
    return (
      <div className="slider-wrapper">
        <Slider {...settings}>
          {storageArr.map((arr, ind) => {
              return (
                <div key={ind} className="visiteCard">
                  <div className="visiteCard_info">
                    <h1>{localStorage.getItem(ind)}</h1>
                    <button className="delCard" onClick={(e) => {localStorage.removeItem(ind);  storageArr.splice(ind,1)}}>delete</button>
                  </div>
                </div>
              );
          })}
        </Slider>
      </div>
    );
  }
}
 */
