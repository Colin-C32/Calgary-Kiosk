import React, { useState, useEffect } from "react";
import { Header } from "../../components/UI/Header";
import { Taskbar } from "../../components/taskbar/Taskbar";
import './TransitHome.css'; 

const delayData = [
  {number: "129", route: "Dalhousie/Sage Hill", delay: "Delayed by 5 minutes"},
  {number: "113", route: "North Ranchlands/Scenic Acres", delay: "Delayed by 2 minutes"}
]

const TransitHome = ({ setPage}) => {

  const [delayDataIndex, setDelayDataIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDelayDataIndex((prevIndex) => (prevIndex + 1) % delayData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header
        setPage={setPage}
        previousPage="Home"
        title="Transit Information"
      />
      <div class="transit-info-container">
        <div class="transit-info">
        <table class= "transit-info-table">
              <tr key={delayDataIndex}>
                <td>{delayData[delayDataIndex].number}</td>
                <td>{delayData[delayDataIndex].route}</td>
                <td>{delayData[delayDataIndex].delay}</td>
              </tr>
          </table>  
        </div>
      </div>
      <div class="transit-options-container">
        <div
            onClick={() => {
              setPage("TransitRoutes");
            }}
            class="transit-option"
          >
            Transit Routes & Schedules
          </div>
          <div
            onClick={() => {
              setPage("PlanATrip");
            }}
            class="transit-option"
          >
            Plan a Trip!
          </div>
          <div
            onClick={() => {
              setPage("FareInformation");
            }}
            class="transit-option"
          >
            Fare Information
          </div>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default TransitHome;
