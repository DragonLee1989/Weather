import { useState, useEffect } from "react";
import axios from "axios";

const useCurrentWeather = () => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    //Gắn cờ đánh dấu data chưa được gọi
    let isFetched = false;

    const fetchData = async () => {
      try {
        const data = await axios
          .get(
            "https://api.weatherapi.com/v1/current.json?key=c9a0ca46550648b29ce125849232709&q=Danang&aqi=no&lang=vi"
          )
          .then((response) => response.data);

        if (!isFetched) {
          setWeather(data);
          // return weather;
          console.log(weather);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    //Nếu chưa thì gọi API lấy data
    if (!isFetched) {
      fetchData();
      //Gọi xong thì đổi cờ là đã gọi
      isFetched = true;
    }

    return () => {
      isFetched = true;
    };
  }, []);
};

export default useCurrentWeather;
