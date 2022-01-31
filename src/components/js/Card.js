import React from 'react';

export default function Card({ props, setStorage }) {
  let storageLength = localStorage.length;
  let storageArr = ["", "", ""];
  const getLocalMemory = () => {
    for (let i = 0; i < storageLength; i++) {
      storageArr.push(localStorage.getItem(localStorage.key(i)));
    }
  };


  getLocalMemory();
  const removeCard = (e) => {
    
    console.log(e.currentTarget)
    if (props === false) {
      setStorage(!props);
    } else if (props === true) {
      setStorage(!props);
    }
  };
  {storageArr.map((arr, ind) => {
    return (
      <div key={ind} id={ind} className="visiteCard">
        <div className="visiteCard_info">
          <h1>{localStorage.getItem(ind)}</h1>
          <button
            className="delCard"
            onClick={(e) => {
              localStorage.removeItem(ind);
              storageArr.splice(ind, 1);
              removeCard(e);
            }}
          >
            delete
          </button>
        </div>
      </div>
    );
  })}
}
