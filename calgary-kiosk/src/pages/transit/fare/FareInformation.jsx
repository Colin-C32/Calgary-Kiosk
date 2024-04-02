import React, { useState } from "react";
import { Header } from "../../../components/UI/Header";
import { Taskbar } from "../../../components/taskbar/Taskbar";
import "./FareInformation.css";

const FareInformation = ({ setPage }) => {
  const [fareData, setFareData] = useState({
    AdultSingleUse: 0,
    YouthSingleUse: 0,
    ChildSingleUse: 0,
    AdultDayPass: 0,
    YouthDayPass: 0,
    ChildDayPass: 0,
    AdultMonthPass: 0,
    YouthMonthPass: 0,
    ChildMonthPass: 0,
  });

  const farePrices = {
    AdultSingleUse: 3.7,
    YouthSingleUse: 2.5,
    ChildSingleUse: 0,
    AdultDayPass: 11.6,
    YouthDayPass: 8.5,
    ChildDayPass: 0,
    AdultMonthPass: 115.0,
    YouthMonthPass: 82.5,
    ChildMonthPass: 0,
  };

  const handleValueChange = (type, value) => {
    setFareData({
      ...fareData,
      [type]: value,
    });
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    for (let key in fareData) {
      totalCost += fareData[key] * farePrices[key];
    }
    return totalCost;
  };

  return (
    <div>
      <Header
        setPage={setPage}
        previousPage="Transit"
        title="Fare Information"
      />
      <div class="fare-container">
        <div class="fare-title">Fares</div>
        <div class="fare-info-container">
          <div></div>
          <div class="age-title">Adult (18+)</div>
          <div class="age-title">Youth (13-17)</div>
          <div class="age-title">Child (0-12)</div>

          <div class="duration">Single Use (90min)</div>
          <div class="price">$3.70</div>
          <div class="price">$2.50</div>
          <div class="price">Free</div>

          <div class="middle-row">
            <div class="duration">Day Pass (till EOD)</div>
            <div class="price">$11.60</div>
            <div class="price">$8.50</div>
            <div class="price">Free</div>
          </div>

          <div class="duration">Month Pass (1 mon)</div>
          <div class="price">$115.00</div>
          <div class="price">$82.50</div>
          <div class="price">Free</div>
        </div>
      </div>

      <div class="fare-calculator-container">
        <div class="fare-title">Fare Calculator</div>
        <div class="fare-info-container">
          <div></div>
          <div class="age-title">Adult (18+)</div>
          <div class="age-title">Youth (13-17)</div>
          <div class="age-title">Child (0-12)</div>

          <div class="duration">Single Use (90min)</div>
          <NumberBox type="AdultSingleUse" onChange={handleValueChange} />
          <NumberBox type="YouthSingleUse" onChange={handleValueChange} />
          <NumberBox type="ChildSingleUse" onChange={handleValueChange} />

          <div class="middle-row">
            <div class="duration">Day Pass (till EOD)</div>
            <NumberBox type="AdultDayPass" onChange={handleValueChange} />
            <NumberBox type="YouthDayPass" onChange={handleValueChange} />
            <NumberBox type="ChildDayPass" onChange={handleValueChange} />
          </div>

          <div class="duration">Month Pass (1 mon)</div>
          <NumberBox type="AdultMonthPass" onChange={handleValueChange} />
          <NumberBox type="YouthMonthPass" onChange={handleValueChange} />
          <NumberBox type="ChildMonthPass" onChange={handleValueChange} />
        </div>
      </div>

      <Taskbar setPage={setPage} />
      <h3 id="total-fare-cost">Total: ${calculateTotalCost().toFixed(2)}</h3>
    </div>
  );
};

const NumberBox = ({ type, onChange }) => {
  const [value, setValue] = useState(0);

  const increment = () => {
    const newValue = value + 1 < 100 ? value + 1 : value;
    setValue(newValue);
    onChange(type, newValue);
  };

  const decrement = () => {
    const newValue = value - 1 >= 0 ? value - 1 : 0;
    setValue(newValue);
    onChange(type, newValue);
  };

  return (
    <div className="number-box">
      <button class="increment-button" onClick={decrement}>
        -
      </button>
      <input class="fare-input" type="number" value={value} readOnly />
      <button class="increment-button" onClick={increment}>
        +
      </button>
    </div>
  );
};
export default FareInformation;
