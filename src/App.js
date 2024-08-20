// import logo from "./logo.svg";
import "./App.css";
import Card from "./Components/Card";
import image1 from "./assest/11.jpg";
import image2 from "./assest/2.jpg";
import image3 from "./assest/3.jpg";
import image4 from "./assest/7.jpg";
import image5 from "./assest/5.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  const [country, setCountry] = useState("Egypt");
  const [city, setCitiy] = useState("Cairo");
  const [timings, setTimings] = useState([]);
  const [date, setDate] = useState("");
  const [cities, setCities] = useState([]);
  const [countrys, setCountrys] = useState([]);
  let id = 1;
  

  const handlechange = (e) => {
    setCountry(e.target.value);
    youssef();
  };
  const handlechange1 = (e) => {
    setCitiy(e.target.value);
  };
  useEffect(() => {
    fetch(
      `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDate(data.data.date.readable);
        setTimings(data.data.timings);
      });
  }, [city , country]);
  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries").then((you) => {
      setCountrys(you.data.data);
      youssef();
    });
  }, [id]);

  const youssef = async () => {
    let res = await axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country: country,
      })
      .then((res) => {
        setCities(res.data.data);
      });
  };
  youssef();

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ flex: "1" }}>
          <h3> متبقى حتى صلاه الفجر </h3>
          <h1> 00:10:20 </h1>
        </div>
        <div style={{ flex: "1" }}>
          <h3> {date}</h3>
          <h1>
            {" "}
            {country} : {city}{" "}
          </h1>
        </div>
      </header>
      <div className="cards">
        <Card image={image5} name={"العشاء"} time={timings.Isha} />
        <Card image={image4} name={"المغرب"} time={timings.Maghrib} />
        <Card image={image3} name={"العصر"} time={timings.Asr} />
        <Card image={image2} name={"الضهر"} time={timings.Dhuhr} />
        <Card image={image1} name={"الفجر"} time={timings.Fajr} />
      </div>
      <div className="selects">
        <select
          className="form-select form-select-lg mt-3"
          aria-label=".form-select-lg example"
          style={{padding:'10px',  border: "1px solid #fff" , marginLeft:'30px' }}
          onChange={(e) => handlechange(e)}
        >
          {countrys.map((coun , index) => (
            <option value={coun.country} key={index}>{coun.country}</option>
          ))}
        </select>
        <select
          className="form-select form-select-lg mt-3"
          aria-label=".form-select-lg example"
          style={{
            padding:'10px' , border: "1px solid #fff" , marginLeft:'30px' 
          }}
          onChange={(e) => handlechange1(e)}
        >
          {cities.map((coun , index) => (
            <option value={coun} key={index}>{coun}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

