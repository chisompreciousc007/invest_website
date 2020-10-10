import React from "react";

function SelectAmount({ submitAmount, SelectAmount, recommit }) {
  return (
    <div className="form-group">
      <select
        onChange={SelectAmount}
        className="form-control"
        id="exampleSelect1"
        style={{
          width: "170px",
          color: "rgb(28, 28, 25)",
          backgroundColor: "rgba(236, 213, 44, 0.67)",
          marginBottom: "inherit",
        }}
      >
        <option value="5000">5,000</option>
        <option value="10000">10,000</option>
        <option value="15000">15,000</option>
        <option value="20000">20,000</option>
        <option value="25000">25,000</option>
        <option value="30000">30,000</option>
        <option value="40000">40,000</option>
        <option value="50000">50,000</option>
        <option value="60000">60,000</option>
        <option value="80000">80,000</option>
        <option value="100000">100,000</option>
        <option value="120000">120,000</option>
        <option value="150000">150,000</option>
        <option value="200000">200,000</option>
        <option value="250000">250,000</option>
        <option value="300000">300,000</option>
        <option value="400000">400,000</option>
        <option value="500000">500,000</option>
      </select>
      <button
        type="button"
        style={{ color: "black" }}
        className="btn btn-primary"
        onClick={submitAmount}
      >
        {recommit ? "Recommit" : "Commit"}
      </button>
    </div>
  );
}
export default SelectAmount;
