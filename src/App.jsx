import axios from "axios";
import { useState, useEffect } from "react";

function app() {
  const API_KEY = import.meta.env.VITE_API_KEY; //mengambil API key dari file .env
  const [city, setCity] = useState(""); //menyimpan nama kota
  const [data, setData] = useState([]); //menyimpan data dari API

  const fectweather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` //memanggil API weather dengan axios
      ); //memanggil API weather dengan axios
      console.log(res.data); //menampilkan data di console
      setData(res.data); //menyimpan data dari API ke state data
    } catch (error) {
      console.error(error);
    } //menampilkan error di console
  };

  useEffect(() => {
    fectweather();
  }, [city]); //memanggil fungsi fectweather saat komponen pertama kali di render

  return (
    <>
      <div className="w-[800px] h-[400px] bg-blue-300 m-auto mt-20 rounded-xl text-center flex flex-col justify-center gap-4">
        <input
          type="text"
          placeholder="Masukkan kota"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-lg text-center"
        />
        <div className="flex gap[20px] items-center">
          <div className="flex flex-col gap-3 m-3 w-[400px] items-center justify-center">
            {/* Ikon cuaca dari API */}
            {data.weather && (
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-[200px]"
              />
            )}
            <div className="flex gap-5 items-center">
              <h1>
                {data?.name}, {data.sys?.country}
              </h1>
              <p className="border-x-2 border-black p-3">{data.main?.temp}°C</p>
              <p>{data.weather?.[0].main}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 m-3 w-[400px] items-center justify-center">
            <p className="flex w-[200px] h-[80px] bg-blue-600 items-center justify-center rounded-2xl">
              Feels like: {data.main?.feels_like}°C
            </p>
            <p className="flex w-[200px] h-[80px] bg-blue-600 items-center justify-center rounded-2xl">
              Humididty: {data.main?.humidity}%
            </p>
            <p className="flex w-[200px] h-[80px] bg-blue-600 items-center justify-center rounded-2xl">
              Wind: {data.wind?.speed}m/s
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default app;
