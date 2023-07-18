import {React, useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function Card() {
  const [fruits, setFruits]=useState([])
  const baseURL = 'https://649a562ebf7c145d0238bbb2.mockapi.io/Fruits';
  useEffect(() => {fetch(baseURL)
    .then(response =>{
        if(!response.ok){
            throw new Error(`HTTP Status: ${response.status}`)
  }
        return response.json()
  })            
    .then(data => {setFruits(data)})
    .catch(error => console.log(error.message));
  },[]);  
  return (
    <div className="container-fluid">
      <div className="row">
        {fruits.map((fruit) => (
          <div className="col s12 m4">
            <div className="card large">
              <div className="card-image">
                <img
                  className="materialboxed responsive-img"
                  src={fruit.image}
                  alt={fruit.name}
                />
              </div>
              <div className="card-content left-align">
                <h5>{fruit.name}</h5>
                <p>Stock:{fruit.stock}</p>
                <p>Price:{fruit.price}</p>
              </div>
              <div className="card-action left-align">
              <a><Link to={`detail/${fruit.id}`} >Detail</Link></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
