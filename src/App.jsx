import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [city, setCity] = useState("");
  const [data, setData] = useState({});

  const fetchWeather = async () => {
    if (!city) return; // kalau input kosong, jangan fetch
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 p-5">
      <div className="w-[850px] bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col gap-6 text-white">
        {/* Input */}
        <input
          type="text"
          placeholder="Masukkan kota..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-xl text-center text-black shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Konten cuaca */}
        {data.weather ? (
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Bagian kiri */}
            <div className="flex flex-col items-center gap-4 w-full md:w-1/2">
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                alt={data.weather[0].description}
                className="w-[180px]"
              />
              <h1 className="text-3xl font-bold">
                {data?.name}, {data.sys?.country}
              </h1>
              <p className="text-lg text-gray-100">
                {data.weather?.[0].description}
              </p>
              <p className="text-4xl font-extrabold">
                {Math.round(data.main?.temp)}°C
              </p>
            </div>

            {/* Bagian kanan */}
            <div className="grid grid-cols-1 gap-4 w-full md:w-1/2">
              <div className="flex flex-col items-center justify-center bg-white/30 rounded-2xl p-4 shadow-md">
                <p className="text-xl">🌡️ Feels like</p>
                <p className="text-2xl font-semibold">
                  {Math.round(data.main?.feels_like)}°C
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/30 rounded-2xl p-4 shadow-md">
                <p className="text-xl">💧 Humidity</p>
                <p className="text-2xl font-semibold">{data.main?.humidity}%</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/30 rounded-2xl p-4 shadow-md">
                <p className="text-xl">💨 Wind</p>
                <p className="text-2xl font-semibold">{data.wind?.speed} m/s</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl">
            Masukkan nama kota untuk cek cuaca 🌍
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
