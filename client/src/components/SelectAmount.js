import React from "react";

function SelectAmount({ duetime, submitAmount, SelectAmount }) {
  return (
    <div className="form-group">
      <label htmlFor="exampleSelect1">
        <h5>
          Please Select an amount to invest, Your Deadline is <b>{duetime}</b>{" "}
        </h5>
      </label>
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
        <option value="30000">40,000</option>
        <option value="30000">50,000</option>
        <option value="30000">60,000</option>
        <option value="30000">80,000</option>
        <option value="30000">100,000</option>
        <option value="30000">120,000</option>
        <option value="30000">150,000</option>
        <option value="30000">200,000</option>
        <option value="30000">250,000</option>
        <option value="30000">300,000</option>
        <option value="30000">400,000</option>
        <option value="30000">500,000</option>
      </select>
      <button
        type="button"
        style={{ color: "black" }}
        class="btn btn-primary"
        onClick={submitAmount}
      >
        Invest
      </button>
    </div>
  );
}
export default SelectAmount;
