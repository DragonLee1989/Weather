import { useState, useEffect } from "react";
import axios from "axios";

interface ICurrentWeather {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: string;
    temp_f: string;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface IHourWeather {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: string;
    temp_f: string;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: [
      {
        hour: THour[];
      }
    ];
  };
}

type THour = {
  time: string;
  temp_c: string;
  condition: {
    text: string;
    icon: string;
  };
};

const CurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(
    null
  );

  const [hourWeather, setHourWeather] = useState<IHourWeather | null>(null);

  useEffect(() => {
    const fetchDataCurrentWeather = async () => {
      try {
        const responseCurrentWeather = await axios.get(
          "https://api.weatherapi.com/v1/current.json?key=c9a0ca46550648b29ce125849232709&q=Danang&aqi=no&lang=vi"
        );
        setCurrentWeather(responseCurrentWeather.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    const fetchDataHourWeather = async () => {
      try {
        const responseHourWeather = await axios.get(
          "https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Danang&days=1&aqi=no&alerts=no&lang=vi"
        );
        setHourWeather(responseHourWeather.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchDataCurrentWeather();
    fetchDataHourWeather();
  }, []);

  const arrays = [0, 1, 2];
  const d = new Date();
  const currentHour = d.getHours();

  return (
    <>
      <div className="currentWeather flex flex-col justify-center items-center p-2">
        <strong className="text-3xl">
          {currentWeather && currentWeather.location.name}
        </strong>
        <h1 className="text-6xl font-bold">
          {currentWeather && currentWeather.current.temp_c}°
        </h1>
        <h1 className="font-bold">
          {currentWeather && currentWeather.location.localtime}
        </h1>
        <p>
          {currentWeather && (
            <img src={currentWeather.current.condition.icon} alt="" />
          )}
        </p>
        <p className="font-bold">
          {currentWeather && currentWeather.current.condition.text}
        </p>
      </div>

      <div className="currentWeather p-2 bg-slate-300 m-2 rounded-2xl mt-[50px]">
        <div className="p-2 ">
          <strong>HOURLY FORECAST</strong>
        </div>

        <div className="flex flex-row place-content-around py-2">
          {arrays.map((arrays) => {
            return (
              <div className="flex flex-col justify-center items-center p-2 rounded-lg bg-gray-600">
                <p className="font-bold text-white">
                  {hourWeather &&
                    hourWeather.forecast.forecastday[0].hour[
                      currentHour + arrays
                    ].time.split(" ")[1]}
                </p>
                <p>
                  {hourWeather && (
                    <img
                      src={
                        hourWeather.forecast.forecastday[0].hour[
                          currentHour + arrays
                        ].condition.icon
                      }
                      alt=""
                    />
                  )}
                </p>
                <p className="font-bold text-white">
                  {hourWeather &&
                    hourWeather.forecast.forecastday[0].hour[
                      currentHour + arrays
                    ].temp_c}
                  °
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
