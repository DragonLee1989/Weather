// import { useState } from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import { FaHome, FaSearch } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import DayWeather from "./components/DayWeather";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage";

function App() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex bg-blue-300 justify-center items-center">
        <div className="screen border-solid border-8 border-black w-[400px] h-[700px] my-5 rounded-2xl">
          <div className="headerWeather flex justify-center h-[10%] ">
            <div className="flex justify-center border-solid border-8 border-black rounded-full w-2 h-2 my-2"></div>
          </div>

          <div className="bodyWeather h-[84%]">
            <BrowserRouter>
              <Routes>
                <Route path="/Weather" element={<CurrentWeather />} />
                <Route
                  path="/Weather/CurrentWeather"
                  element={<CurrentWeather />}
                />
                <Route path="/Weather/DayWeather" element={<DayWeather />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </div>

          <div className="footerWeather h-[6%] mb-2">
            <footer className="flex justify-center gap-10 py-1 rounded-b-lg bg-slate-300">
              <a
                href="/Weather/CurrentWeather"
                className="p-2 hover:bg-slate-600 hover:text-white active:bg-slate-700 rounded-full"
              >
                <FaHome />
              </a>
              <a
                href="/Weather/DayWeather"
                className="p-2 hover:bg-slate-600 hover:text-white active:bg-slate-700 rounded-full"
              >
                <GrSchedule />
              </a>

              <a
                href="/Weather/SearchWeather"
                className="p-2 hover:bg-slate-600 hover:text-white active:bg-slate-700 rounded-full"
              >
                <FaSearch />
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
