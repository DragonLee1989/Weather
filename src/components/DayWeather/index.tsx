import { useState, useEffect } from "react";
import axios from "axios";
import { LiaUmbrellaSolid } from "react-icons/lia";

interface IDayWeather {
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
    forecastday: TForeCastDay[];
  };
}

type TForeCastDay = {
  date: string;
  day: {
    maxtemp_c: string;
    mintemp_c: string;
    avghumidity: string;
    condition: {
      text: string;
      icon: string;
    };
  };
};

interface TSingleDay {
  day: string;
  icon: string;
  humidity: string;
  minTemp: string;
  maxTemp: string;
}

const SingleDay = ({ day, icon, humidity, minTemp, maxTemp }: TSingleDay) => {
  return (
    <div>
      <li className="flex justify-around items-center w-[350px] ">
        <div>
          <p className="font-bold text-white">{day}</p>
        </div>
        <div className="flex flex-col justify-around items-center">
          <img src={icon} alt="icon" />
          <div className="flex justify-center items-center">
            <LiaUmbrellaSolid />
            <p className="font-bold text-white"> {humidity}%</p>
          </div>
        </div>
        <div className="font-bold text-white">
          {minTemp}°C / {maxTemp}°C
        </div>
      </li>
    </div>
  );
};

const DayWeather = () => {
  const [dayWeather, setDayWeather] = useState<IDayWeather | null>(null);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const fetchDataDayWeather = async () => {
      try {
        const responseDayWeather = await axios.get(
          "https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Danang&days=5&aqi=no&alerts=no&lang=vi"
        );
        setDayWeather(responseDayWeather.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchDataDayWeather();
  }, []);

  // const d = new Date("2024-01-08");
  // let day = days[d.getDay()];
  // const day = days[new Date(forecastday.date).getDay()];
  const indexDay = dayWeather && dayWeather.forecast.forecastday.length;

  return (
    <div>
      <p className="text-2xl font-bold text-white mx-4 pt-5 mb-1">
        5 DAY FORECAST
      </p>
      <div className="flex flex-col justify-center items-center py-2 mx-2 my-5 rounded-3xl bg-slate-950 opacity-45">
        {dayWeather &&
          dayWeather.forecast.forecastday.map((forecastday, index) => {
            return (
              <ul>
                <SingleDay
                  key={`DayWeather_${index}`}
                  day={days[new Date(forecastday.date).getDay()]}
                  icon={forecastday.day.condition.icon}
                  humidity={forecastday.day.avghumidity}
                  minTemp={forecastday.day.mintemp_c}
                  maxTemp={forecastday.day.maxtemp_c}
                />
                {indexDay && indexDay - 1 > index && <hr className="w-full" />}
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default DayWeather;
