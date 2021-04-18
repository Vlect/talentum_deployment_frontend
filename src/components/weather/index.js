import React, {useEffect, useState} from 'react';
import styles from './weather.module.css';
import {getWheather} from './../../functions/endpoints/getWheather';
import {months} from './../../utils/months';
import temp from './../../assets/icons/temp.png';
import humidity from './../../assets/icons/humidity.png';
import wind from './../../assets/icons/wind.png';
import cali from './../../assets/background.png';
import bogota from './../../assets/bogota.jpg';
import barranquilla from './../../assets/barranquilla.jpg';
import medellin from './../../assets/medellin.jpeg';
/**
 * @user        Vlect/juanferdaza23@gmail.com
 * @date        April 17 2021 
 * @description This component is made to print all the "weather cards"
 * @returns     If the response from the server has the card's information, then the component will return the "weather cards". 
 *              If not, then it returns a message warning the user that he/she can not proceed.
 */
const Weather = () => {
  const currentDate = new Date();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [data, setData] = useState({})
  // With this UseEffect, we capture all the data coming from the server and set it into the "data" state.
  useEffect(() => {
    const fetchData = async () => {
      //getWheather is a functions for getting all the data from the server
      const data = await getWheather();
      setData(data);
    }
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  if(data.length > 0){
    return (
      <div className={styles.home}>
        <div className={styles.navBar}>
            <input
             type="text"
             placeholder="Buscar"
             onChange={(e) => setSearch(e.target.value)}
            />
            <input type="button" onClick={() => setOrder("temperatura")} value="Temperatura"/>
            <input type="button" onClick={() => setOrder("velocidad")} value="Velocidad del viento"/>
            <input type="button" onClick={() => setOrder("humedad")} value="Humedad"/>
        </div>
        {data.length > 0 && data[0].name && bogota && cali && wind && humidity && temp
          ? data.filter((item) => {
            return item.name.toLowerCase().includes(search.trim().toLowerCase())
          }).sort((a,b) => {
            if(order === "temperatura"){
              let nameA = a.main.temp;
              let nameB = b.main.temp;
              if(nameA < nameB){
                return -1
              }
            }else if(order === "velocidad"){
              let nameA = a.wind.speed;
              let nameB = b.wind.speed;
              if(nameA < nameB){
                return -1
              }
            }else if(order === "humedad"){
              let nameA = a.main.humidity;
              let nameB = b.main.humidity;
              if(nameA < nameB){
                return -1
              }
            }
          }).map((item,index) => (
            <div key={index} className={styles.home_weather__card}>
              <div className={styles.weather_card__top}>
                <div className={styles.card_top__info}>
                  <h4>
                    {item.name}
                  </h4>
                  <div className={styles.top_info__date}>
                    <span className={styles.info_date__values}>{currentDate.getDate()}</span>
                    <span className={styles.info_date__values}>{months[currentDate.getMonth()]}</span>
                    <span className={styles.info_date__values}>{currentDate.getFullYear()}</span>
                  </div>
                  <span className={styles.temp}>
                    {item.main.temp}º
                  </span>
                </div>
                {item.name === "Santiago de Cali" 
                  ? <img className={styles.card_top__background} src={cali} alt=""/> 
                  : item.name === "Bogotá" 
                  ? <img className={styles.card_top__background} src={bogota} alt=""/>
                  : item.name === "Medellín"
                  ? <img className={styles.card_top__background} src={medellin} alt=""/>
                  : <img className={styles.card_top__background} src={barranquilla} alt=""/>}
                <div className={styles.weather_card__base}>
                  <span>Clima</span>
                  <span>/</span>
                  {item.weather.map((value,index) => (
                    <span key={index}>
                      {value.main}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.weather_card__bottom}>
                <div className={styles.card_bottom__blocks}>
                  <img src={temp} alt=""/>
                  <span>Temperatura</span>
                  <span>{item.main.temp}</span>
                </div>
                <div className={styles.card_bottom__blocks}>
                  <img src={humidity} alt=""/>
                  <span>Húmedad</span>
                  <span>{item.main.humidity}%</span>
                </div>
                <div className={styles.card_bottom__blocks}>
                  <img src={wind} alt=""/>
                  <span>Velocidad Viento</span>
                  <span>{item.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          ))
          : data.length > 0 &&
            <>
              <div>{data[0].error}</div> 
            </>}
        
      </div>
    );
  }else{
    return(
      <div className={styles.contentLoader}>
        <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }
  
}

export default Weather;
